module.exports = {
    plugins: {
        autoprefixer: {},
        tailwindcss: './tailwind.config.js',
        '@fullhuman/postcss-purgecss': {
            content: [
                './src/**/*.vue',
            ],
            whitelistPatterns: [
                /^vue-ads-mb-\d{1,3}$/,
                /^vue-ads-mr-\d{1,3}$/,
            ],
        },
        'postcss-import': {},
        'postcss-url': {},
    },
};
