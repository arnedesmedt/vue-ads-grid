<template>
    <div class="vue-ads-bg-grey-lighter vue-ads-p-4">
        <vue-ads-grid :rows="7" :columns="5" :row-gap="1" :column-gap="1">
            <vue-ads-grid-item position="a1/d1" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: a1/d1
            </vue-ads-grid-item>
            <vue-ads-grid-item position="e1/e2" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
                test: e1/e2
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
            <vue-ads-grid-item position="e3" :class="{'vue-ads-p-2': true, 'vue-ads-bg-white': true, 'vue-ads-shadow': true}">
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
    <!--<div id="app" class="vue-ads-bg-grey-lightest vue-ads-p-8">-->
        <!--<vue-ads-grid-->
            <!--:rows="7"-->
            <!--:columns="5"-->
            <!--row-gap="30px"-->
            <!--column-gap="30px"-->
            <!--height="40px"-->
        <!--&gt;-->
            <!--<vue-ads-grid-item position="a:c" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">-->
                <!--<div class="vue-ads-p-6">-->
                    <!--Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium-->
                <!--</div>-->
            <!--</vue-ads-grid-item>-->
            <!--<vue-ads-grid-item position="a:b" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">-->
                <!--<div class="vue-ads-p-6">-->
                    <!--Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium-->
                <!--</div>-->
            <!--</vue-ads-grid-item>-->
            <!--<vue-ads-grid-item position="d:e" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">-->
                <!--<div class="vue-ads-p-6">-->
                    <!--Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium-->
                <!--</div>-->
            <!--</vue-ads-grid-item>-->
            <!--<vue-ads-grid-item position="c" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">-->
                <!--<div class="vue-ads-p-6">-->
                    <!--Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium-->
                <!--</div>-->
            <!--</vue-ads-grid-item>-->
        <!--</vue-ads-grid>-->
    <!--</div>-->
</template>

<script>
import './assets/css/tailwind.css';

import VueAdsGrid from './components/Grid';
import VueAdsGridItem from './components/GridItem';

export default {
    name: 'app',
    components: {
        VueAdsGrid,
        VueAdsGridItem,
    },
};
</script>
