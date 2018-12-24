<template>
    <div
        class="vue-ads-w-full"
        :style="gridStyles"
    >
        <slot/>
    </div>
</template>

<script>
// todo add responsiveness by the tailwind responsive labels
import CharIntConverter from '../services/CharIntConverter';

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
            type: String,
            default: '0px',
        },

        columnGap: {
            type: String,
            default: '0px',
        },

        height: {
            type: String,
            default: 'relative',
        },
    },

    data: function () {
        return {
            filledRows: [
                [],
            ],
        };
    },

    computed: {
        gridStyles () {
            let styles = {
                display: 'grid',
                'grid-template-columns': `repeat(${this.columns}, 1fr)`,
                'grid-row-gap': this.rowGap,
                'grid-column-gap': this.columnGap,
            };

            if (this.height === 'relative') {
                styles['grid-template-rows'] = `repeat(${this.rows}, 1fr)`;
            } else {
                styles['grid-auto-rows'] = this.height;
            }

            return styles;
        },
    },

    methods: {
        setupEventListener () {
            window.addEventListener('resize', this.updateGridItemChildren);
        },

        children () {
            return this.$children.filter(child => {
                return child.$options.name === 'VueAdsGridItem';
            });
        },

        updateGridItemChildren () {
            this.filledRows = [
                [],
            ];
            let maxColumn = CharIntConverter.integerToCharacters(this.columns);

            this.children().forEach(child => {
                child.maxColumn = maxColumn;
                child.maxRow = this.rows;
                child.height = this.height;
                child.rowGap = parseInt(this.rowGap);
                child.updateItemStyle();
            });
        },

        firstEmptyRow (columnStart, columnEnd, rowEnd) {
            let found = false;
            let initialRow = 0;
            rowEnd = parseInt(rowEnd.substr(5));

            while(!found) {
                let lastRow = initialRow + rowEnd;
                for (let row = initialRow; row < lastRow; row++) {
                    if (!this.filledRows[row]) {
                        this.filledRows[row] = [];
                    }

                    for (let column = columnStart - 1; column < columnEnd - 1; column++) {
                        if (this.filledRows[row][column]) {
                            found = false;
                            break;
                        }

                        found = true;
                    }

                    if (!found) {
                        initialRow = row + 1;
                        lastRow = initialRow + rowEnd;
                    }
                }


                for (let row = initialRow; row < lastRow; row++) {
                    for (let column = columnStart - 1; column < columnEnd - 1; column++) {
                        this.filledRows[row][column] = true;
                    }
                }
            }

            return initialRow + 1;
        },
    },

    watch: {
        columns: {
            handler: 'updateGridItemChildren',
        },

        rows: {
            handler: 'updateGridItemChildren',
        },

        height: {
            handler: 'updateGridItemChildren',
        },

        rowGap: {
            handler: 'updateGridItemChildren',
        },
    },

    mounted () {
        this.updateGridItemChildren();
        this.setupEventListener();
    },
};
</script>
