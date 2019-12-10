module.exports = {
    devServer: {
      proxy: 'http://127.0.0.1/yutang_api/public/index.php/api/'
    },
    css: {
      loaderOptions: {
          css: {},
          postcss: {
              plugins: [
                  require('postcss-pxtorem')({
                      rootValue: 75,
                      propList: ['*'],
                      selectorBlackList: ['van']
                  })
              ]
          }
      }
   }
  }