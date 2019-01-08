<template>
    <div>
        <slot></slot>
    </div>
</template>

<script>

export default {
    name: 'VueAdsGridItem',

    props: {
        position: {
            type: String,
            required: true,
        },

        dimensions: {
            type: Object,
            required: false,
        },
    },
};
</script>
