<template>
    <div class="vue-ads-bg-grey-lighter vue-ads-p-4">
        <div class="vue-ads-mb-4">
            <input type="text" v-model="rows"/>
            <input type="text" v-model="columns"/>
            <input type="text" v-model="rowGap"/>
            <input type="text" v-model="columnGap"/>
        </div>
        <vue-ads-grid :rows="rows" :columns="columns" type="grip" :row-gap="rowGap" :column-gap="columnGap">
            <vue-ads-grid-item position="a1/d1" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: a1/d1
            </vue-ads-grid-item>
            <vue-ads-grid-item
                position="e1"
                :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}"
                @click.native="click"
            >
                <div v-for="(update, key) in updates" :key="key">testje update {{update}}</div>
            </vue-ads-grid-item>
            <vue-ads-grid-item position="a2/a3" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: a2/a3
            </vue-ads-grid-item>
            <vue-ads-grid-item position="b2/d2" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: b2/d2
            </vue-ads-grid-item>
            <vue-ads-grid-item position="b3/c3" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: b3/c3
            </vue-ads-grid-item>
            <vue-ads-grid-item position="d3" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: d3
            </vue-ads-grid-item>
            <vue-ads-grid-item position="e2/e3" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: e3
            </vue-ads-grid-item>
            <vue-ads-grid-item position="4" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: 4
            </vue-ads-grid-item>
            <vue-ads-grid-item position="5" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: 5
            </vue-ads-grid-item>
            <vue-ads-grid-item position="6" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: 6
            </vue-ads-grid-item>
            <vue-ads-grid-item position="7" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: 7
            </vue-ads-grid-item>
        </vue-ads-grid>
    </div>
</template>

<script>
import './assets/css/tailwind.css';

import VueAdsGrid from './components/Grid';
import VueAdsGridItem from './components/GridItem';

// Todo Now the grid templates are by default 1fr, search a sort of manner that the end user can change this

export default {
    name: 'app',
    components: {
        VueAdsGrid,
        VueAdsGridItem,
    },

    data () {
        return {
            updates: [],
            columns: 'sm:5 md:8',
            rows: 'sm:7 md:10',
            columnGap: 'sm:2 md:8 xl:16',
            rowGap: 'sm:2 md:8 xl:16',
        };
    },

    methods: {
        click () {
            this.updates.push('test');
        },
    },
};
</script>
