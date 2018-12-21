<template>
    <div id="app">
        <vue-ads-grid>
            <vue-ads-grid-item/>
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

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
