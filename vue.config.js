const { defineConfig } = require("@vue/cli-service");
let path = require("path")
module.exports = defineConfig({
  publicPath: '/',
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  //代理
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^api': '/api'
        }
      },
      // '/foo': {
      //   target: '<other_url>'
      // }
    }
  },
  //将src变为@
  configureWebpack: (config) => {
    config.resolve = {
      extensions: ['.js', '.json', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    }
  }
});
