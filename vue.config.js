module.exports = {

  //静态资源目录 防止报错找不到
  assetsDir: 'static',            /* 静态资源目录 */
  // publicPath: '/demo/',        /* 公共路径,部署在子路径中要使用他*/
  productionSourceMap: false,     /* 屏蔽sourceMap */

  chainWebpack: config => {

    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      // 发布模式不打包这些,然后public/index.html的head标签内要添加相关cdn资源链接
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        'vuex': 'Vuex',
        'mavon-editor': 'MvonEditor',
        moment: 'moment'
      })
      // 用于修改标题
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args;
      })
    })

    // 开发模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args;
      })
    })
  },

}