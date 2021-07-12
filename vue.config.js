module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-px-to-viewport')({
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 5,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            propList: ['*'],
            exclude: /node_modules/i,
          }),
        ],
        // plugins: [require('postcss-adaptive')({ remUnit: 75, baseDpr: 2 })]
      },
    },
  },
  pluginOptions: {
    import: {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true,
    },
  },
};
