<script>
import Positioner from '../services/Positioner';
import TailwindConfig from '../../tailwind.config';

export default {
    name: 'VueAdsGrid',

    props: {
        rows: {
            type: String,
            required: true,
        },

        columns: {
            type: String,
            required: true,
        },

        rowGap: {
            type: String,
            default: '2',
        },

        columnGap: {
            type: String,
            default: '2',
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
            positioner: new Positioner(
                this.rows,
                this.columns,
                this.rowGap,
                this.columnGap,
            ),
            directions: [
                'row',
                'column',
            ],
            windowSize: null,
            windowSizes: TailwindConfig.screens,
        };
    },

    created () {
        Object.keys(this.windowSizes)
            .forEach(key => {
                this.windowSizes[key] = parseInt(this.windowSizes[key]);
            });

        this.resizeWindow();
        this.positioner.windowSize = this.windowSize;
    },

    mounted () {
        if (this.isResponsive()) {
            window.addEventListener('resize', this.resizeWindow);
        }
    },

    render (createElement) {
        this.loadDimensions();
        let slots = this.slots();

        if (this.type === 'flex') {
            let counter = {
                value: 0,
            };
            let children = this.buildDivTree(createElement, slots, counter);

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

        slots.forEach(slot => {
            let position = slot.componentOptions.propsData.dimensions[this.windowSize];

            if (slot.componentInstance) {
                let style = slot.componentInstance.$vnode.elm.style;
                style.setProperty('gridColumnStart', position.start.column);
                style.setProperty('gridColumnEnd', position.end.column);
                style.setProperty('gridRowStart', position.start.row);
                style.setProperty('gridRowEnd', position.end.row);

                return;
            }

            if (!slot.data.style) {
                slot.data.style = {};
            }

            slot.data.style['grid-column-start'] = position.start.column;
            slot.data.style['grid-column-end'] = position.end.column;
            slot.data.style['grid-row-start'] = position.start.row;
            slot.data.style['grid-row-end'] = position.end.row;
        });

        return createElement(
            'div',
            {
                style: {
                    display: 'grid',
                    'grid-column-gap': TailwindConfig.margin[this.positioner.columnGap[this.windowSize]],
                    'grid-row-gap': TailwindConfig.margin[this.positioner.rowGap[this.windowSize]],
                    'grid-template-columns': `repeat(${this.positioner.columns[this.windowSize]}, 1fr)`,
                    'grid-template-rows': `repeat(${this.positioner.rows[this.windowSize]}, 1fr)`,

                },
            },
            slots
        );
    },

    watch: {
        rows: 'rowsChanged',
        columns: 'columnsChanged',
        rowGap: 'rowGapChanged',
        columnGap: 'columnGapChanged',
        windowSize: 'windowSizeChanged',
    },

    methods: {
        isResponsive () {
            return Boolean(this.$slots.default.find(slot => {
                return Object.values(slot.componentOptions.propsData.dimensions)
                    .filter(dimension => dimension).length > 2;
            }));
        },

        slots () {
            return this.$slots.default
                .filter(slot => {
                    return slot.tag && slot.tag.indexOf('VueAdsGridItem') > -1;
                });
        },

        loadDimensions () {
            this.slots()
                .forEach(slot => {
                    slot.componentOptions.propsData.dimensions = this.positioner.convert(slot.componentOptions.propsData.position);
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
                let hasRowGap = counter.value % 2 === 0 && index < groups.length - 1;
                let hasColumnGap = counter.value % 2 === 1 && index < groups.length - 1;

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

                    if (slot.componentInstance) {
                        let classList = slot.componentInstance.$vnode.elm.classList;
                        let style = slot.componentInstance.$vnode.elm.style;

                        style.setProperty('flexGrow', groupSize);
                        classList.remove(...(classList.value.match(/vue-ads-m[b|r]-?[^\s]*/g) || []));

                        if (hasRowGap) {
                            classList.add(`vue-ads-mb-${this.positioner.rowGap[this.windowSize]}`);
                        }

                        if (hasColumnGap) {
                            classList.add(`vue-ads-mr-${this.positioner.columnGap[this.windowSize]}`);
                        }

                        return slot;
                    }

                    slot.data.style['flex-grow'] = groupSize;
                    slot.data.class[`vue-ads-mb-${this.positioner.rowGap[this.windowSize]}`] = hasRowGap;
                    slot.data.class[`vue-ads-mr-${this.positioner.columnGap[this.windowSize]}`] = hasColumnGap;

                    return slot;
                }

                return createElement(
                    'div',
                    {
                        class: {
                            'vue-ads-flex': group.length > 1,
                            'vue-ads-flex-col': group.length > 1 && counter.value % 2 === 1,
                            'vue-ads-flex-row': group.length > 1 && counter.value % 2 === 0,
                            [`vue-ads-mb-${this.positioner.rowGap[this.windowSize]}`]: hasRowGap,
                            [`vue-ads-mr-${this.positioner.columnGap[this.windowSize]}`]: hasColumnGap,
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

        rowsChanged (rows) {
            this.positioner.rows = rows;
        },

        columnsChanged (columns) {
            this.positioner.columns = columns;
        },

        rowGapChanged (rowGap) {
            this.positioner.rowGap = rowGap;
        },

        columnGapChanged (columnGap) {
            this.positioner.columnGap = columnGap;
        },

        windowSizeChanged (windowSize) {
            this.positioner.windowSize = windowSize;
        },
    },
};
</script>
