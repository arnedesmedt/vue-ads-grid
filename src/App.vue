<template>
    <div id="app" class="vue-ads-bg-grey-lightest vue-ads-p-8">
        <vue-ads-grid
            :rows="7"
            :columns="5"
            row-gap="30px"
            column-gap="30px"
            height="40px"
        >
            <vue-ads-grid-item position="a:c" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">
                <div class="vue-ads-p-6">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </div>
            </vue-ads-grid-item>
            <vue-ads-grid-item position="a:b" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">
                <div class="vue-ads-p-6">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </div>
            </vue-ads-grid-item>
            <vue-ads-grid-item position="d:e" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">
                <div class="vue-ads-p-6">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </div>
            </vue-ads-grid-item>
            <vue-ads-grid-item position="c" class="vue-ads-bg-white vue-ads-rounded-sm vue-ads-shadow">
                <div class="vue-ads-p-6">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium
                </div>
            </vue-ads-grid-item>
        </vue-ads-grid>
    </div>
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
