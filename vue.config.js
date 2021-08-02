const px2rem = require('postcss-px2rem')
// 配置postcss-px2rem
const postcss = px2rem({
    remUnit: 37.5
})

module.exports = {
    lintOnSave: false,

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:4000',
                pathRewrite: {'^/api' : ''},
                changeOrigin: true
            }}
    },

    css: { // 添加postcss配置
        loaderOptions: {
            postcss: {
                plugins: [
                    postcss
                ]
            }
        }
    },

    //配置原始的webpack配置文件

    configureWebpack:{

    },

    pluginOptions: {
      i18n: {
        locale: 'en',
        fallbackLocale: 'en',
        localeDir: 'locales',
        enableInSFC: false
      }
    }
}
