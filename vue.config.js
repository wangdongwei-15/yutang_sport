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
    },
    publicPath:'/dist/',
    chainWebpack:config=>{
        //发布模式
        config.when(process.env.NODE_ENV === 'production',config=>{
            console.log('production');
            config.entry('app').clear().add('./src/main-prod.js');
             //使用externals设置排除项
             config.set('externals',{
                vue:'Vue',
                vant:'vant'
            })

            //使用插件
            config.plugin('html').tap(args=>{
                //添加参数isProd
                args[0].isProd = true
                return args
            })

        })
        //开发模式
        config.when(process.env.NODE_ENV === 'development',config=>{
            console.log('development');
            config.entry('app').clear().add('./src/main-dev.js');
            //使用插件
            config.plugin('html').tap(args=>{
                //添加参数isProd
                args[0].isProd = false
                return args
            })
            
        })
    }
}