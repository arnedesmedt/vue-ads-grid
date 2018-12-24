<template>
    <div id="app">
        <vue-ads-grid
            :rows="7"
            :columns="5"
            row-gap="10px"
            column-gap="10px"
            height="40px"
        >
            <vue-ads-grid-item position="c">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </vue-ads-grid-item>
            <vue-ads-grid-item position="a:b">
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
            </vue-ads-grid-item>
            <vue-ads-grid-item position="a:b">
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
            </vue-ads-grid-item>
            <vue-ads-grid-item position="d:e">
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
                test<br/>
            </vue-ads-grid-item>
        </vue-ads-grid>
    </div>
</template>

<script>
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
