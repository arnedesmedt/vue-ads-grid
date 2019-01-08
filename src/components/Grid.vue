<script>
import Positioner from '../services/Positioner';
import TailwindConfig from '../../tailwind.config';

export default {
    name: 'VueAdsGrid',

    props: {
        rows: {
            type: Number,
            required: true,
        },

        columns: {
            type: Number,
            required: true,
        },

        rowGap: {
            type: Number,
            default: 2,
        },

        columnGap: {
            type: Number,
            default: 2,
        },

        type: {
            type: String,
            default: 'flex',
            validator (type) {
                return [
                    'flex',
                    'grid',
                ].includes(type);
            },
        },
    },

    data: function () {
        return {
            positioner: new Positioner(this.rows, this.columns),
            directions: [
                'row',
                'column',
            ],
            slots: null,
            windowSize: null,
            windowSizes: null,
        };
    },

    created () {
        this.loadDimensions();

        if (this.isResponsive()) {
            this.windowSizes = TailwindConfig.screens;
            Object.keys(this.windowSizes)
                .forEach(key => {
                    this.windowSizes[key] = parseInt(this.windowSizes[key]);
                });

            window.addEventListener('resize', this.resizeWindow);
            this.resizeWindow();
        }
    },

    render (createElement) {
        if (this.type === 'flex') {
            let counter = {
                value: 0,
            };
            let children = this.buildDivTree(createElement, this.slots, counter);

            return createElement(
                'div',
                {
                    class: {
                        'vue-ads-flex': true,
                        'vue-ads-w-full': true,
                        'vue-ads-flex-col': counter.value % 2 === 0,
                        'vue-ads-flex-row': counter.value % 2 === 1,
                    },
                },
                children
            );
        }

        this.slots.forEach(slot => {
            if (! slot.componentInstance && !slot.data.style) {
                slot.data.style = {};
            }

            let position = slot.componentOptions.propsData.dimensions[this.windowSize];
            let style = slot.componentInstance ? slot.componentInstance.$vnode.elm.style : slot.data.style;

            style['grid-column-start'] = position.start.column;
            style['grid-column-end'] = position.end.column;
            style['grid-row-start'] = position.start.row;
            style['grid-row-end'] = position.end.row;
        });

        return createElement(
            'div',
            {
                style: {
                    display: 'grid',
                    'grid-column-gap': TailwindConfig.margin[this.columnGap],
                    'grid-row-gap': TailwindConfig.margin[this.rowGap],

                },
            },
            this.$slots.default
        );
    },

    methods: {
        isResponsive () {
            return Boolean(this.$slots.default.find(slot => {
                return Object.values(slot.componentOptions.propsData.dimensions)
                    .filter(dimension => dimension).length > 2;
            }));
        },

        loadDimensions () {
            this.slots = this.$slots.default
                .filter(slot => {
                    return slot.tag && slot.tag.indexOf('VueAdsGridItem') > -1;
                })
                .map(slot => {
                    slot.componentOptions.propsData.dimensions = this.positioner.convert(slot.componentOptions.propsData.position);

                    return slot;
                });
        },

        buildDivTree (createElement, slots, counter) {
            let key = this.directions[counter.value % 2];
            let otherKey = this.directions[(counter.value + 1) % 2];
            let groups = this.divideInGroups(slots, counter.value);

            return groups.map((group, index) => {
                let groupNotReady = Boolean(group.find(dimension => {
                    return dimension.length[otherKey] !== group[0].length[otherKey] ||
                        dimension.start[otherKey] !== group[0].start[otherKey];
                }));

                if (groups.length === 1 && groupNotReady && counter.value > 1) {
                    throw new Error('Grid items are not positioned for a grid flex system.');
                }

                let newSlots = group.map(dimension => {
                    return slots[dimension.index];
                });

                let children;

                if (groupNotReady) {
                    let newCounter = {
                        value: (counter.value + 1) % 2,
                    };

                    if (groups.length === 1) {
                        counter.value = newCounter.value;
                        newCounter.value += 2;
                    }

                    children = this.buildDivTree(createElement, newSlots, newCounter);
                } else {
                    children = newSlots;
                }

                if (groups.length === 1) {
                    return children;
                }

                let minStart = Math.min(...group.map(dimension => dimension.start[key]));
                let maxEnd = Math.max(...group.map(dimension => dimension.end[key]));
                let groupSize = maxEnd - minStart;

                if (group.length === 1) {
                    let slot = slots[group[0].index];

                    if (! slot.componentInstance) {
                        if (!slot.data.style) {
                            slot.data.style = {};
                        }

                        if (!slot.data.class) {
                            slot.data.class = {};
                        }
                    }

                    let style = slot.componentInstance ? slot.componentInstance.$vnode.elm.style : slot.data.style;
                    let classList = slot.componentInstance ? slot.componentInstance.$vnode.elm.classList : slot.data.class;


                    style['flex-grow'] = groupSize;
                    classList['vue-ads-mb-' + this.rowGap] = counter.value % 2 === 0 && index < groups.length - 1;
                    classList['vue-ads-mr-' + this.columnGap] = counter.value % 2 === 1 && index < groups.length - 1;

                    return slot;
                }

                return createElement(
                    'div',
                    {
                        class: {
                            'vue-ads-flex': group.length > 1,
                            'vue-ads-flex-col': group.length > 1 && counter.value % 2 === 1,
                            'vue-ads-flex-row': group.length > 1 && counter.value % 2 === 0,
                            ['vue-ads-mb-' + this.rowGap]: counter.value % 2 === 0 && index < groups.length - 1,
                            ['vue-ads-mr-' + this.columnGap]: counter.value % 2 === 1 && index < groups.length - 1,
                        },
                        style: {
                            'flex-grow': groupSize,
                        },
                    },
                    children
                );
            });
        },

        divideInGroups (slots, counter) {
            let groups = [];
            let groupIndex = -1;
            let key = this.directions[counter % 2];
            let dimensions = this.dimensionsOfSlots(slots);
            let rowColumnIndex = this.startRowColumnIndex(dimensions, key);

            while (dimensions.length > 0) {
                let foundCut = !dimensions.find(dimension => {
                    return dimension.start[key] < rowColumnIndex;
                });

                if (foundCut) {
                    groups.push([]);
                    groupIndex++;
                }

                dimensions = dimensions.filter(dimension => {
                    let nonOverlap = dimension.start[key] <= rowColumnIndex &&
                        dimension.end[key] <= (rowColumnIndex + 1);

                    if (nonOverlap) {
                        groups[groupIndex].push(dimension);
                    }

                    return !nonOverlap;
                });

                rowColumnIndex++;
            }

            return groups;
        },

        dimensionsOfSlots (slots) {
            return slots.map((slot, index) => {
                let dimension = slot.componentOptions.propsData.dimensions[this.windowSize];
                dimension.index = index;

                return dimension;
            });
        },

        startRowColumnIndex (dimensions, key) {
            return dimensions.reduce((index, dimension) => {
                if (dimension.start[key] < index) {
                    return dimension.start[key];
                }

                return index;
            }, Number.MAX_SAFE_INTEGER);
        },

        resizeWindow () {
            this.windowSize = Object.keys(this.windowSizes)
                .reduce((size, key) => {
                    if (parseInt(window.innerWidth) >= this.windowSizes[key]) {
                        return key;
                    }

                    return size;
                }, 'all');
        },
    },
};
</script>
