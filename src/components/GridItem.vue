<template>
    <div
        :style="itemStyle"
    >
        <div ref="content">
            <slot/>
        </div>
    </div>
</template>

<script>
import CharIntConverter from '../services/CharIntConverter';

export default {
    name: 'VueAdsGridItem',

    props: {
        position: {
            type: String,
            required: true,
        },
    },

    data () {
        return {
            maxColumn: null,
            maxRow: null,
            height: null,
            rowGap: null,
            itemStyle: {},
        };
    },

    computed: {
        columnStart () {
            return CharIntConverter.charactersToInteger(this.startPosition[0]);
        },

        columnEnd () {
            return CharIntConverter.charactersToInteger(this.endPosition[0]) + 1;
        },

        positions () {
            return this.position.split(':');
        },

        startPosition () {
            if (this.positions[0] === '') {
                if (this.positions[1].length === 2) {
                    return this.positions[1];
                }

                return 'a1';
            }

            if (this.positions[0].length === 2) {
                return this.positions[0];
            }

            if (Number.isInteger(Number(this.positions[0]))) {
                return 'a' + this.positions[0];
            }

            return this.positions[0] + '1';
        },

        endPosition () {
            if (this.positions[1] === undefined) {
                if (this.positions[0].length === 2) {
                    return this.positions[0];
                }

                if (Number.isInteger(Number(this.positions[0]))) {
                    return this.maxColumn + this.positions[0];
                }

                return this.positions[0] + this.maxRow;
            }

            if (this.positions[1].length === 2) {
                return this.positions[1];
            }

            if (Number.isInteger(Number(this.positions[1]))) {
                return this.maxColumn + this.positions[1];
            }

            return this.positions[1] + this.maxRow;
        },
    },

    methods: {
        updateItemStyle () {
            this.itemStyle = {
                'grid-column-start': this.columnStart,
                'grid-column-end': this.columnEnd,
                'grid-row-start': this.rowStart(),
                'grid-row-end': this.rowEnd(),
            };
        },

        rowStart () {
            if (this.height === 'relative') {
                return parseInt(this.startPosition[1]);
            }

            return this.$parent.firstEmptyRow(this.columnStart, this.columnEnd, this.rowEnd());
        },

        rowEnd () {
            if (this.height === 'relative') {
                return parseInt(this.endPosition[1]) + 1;
            }

            let totalHeight = this.$refs.content.getBoundingClientRect().height + this.rowGap;
            let heightRow =parseInt(this.height) + this.rowGap;

            return 'span ' + Math.ceil(totalHeight / heightRow);
        },
    },
};
</script>
