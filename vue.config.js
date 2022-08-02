const { defineConfig } = require("@vue/cli-service");
let path = require("path")
module.exports = defineConfig({
  publicPath: "./", // 公共路径(必须有的)
  outputDir: "dist", // 输出文件目录
  assetsDir: "static", //静态资源文件名称
  productionSourceMap: false, //去除打包后js的map文件
  //关闭语法检查
  lintOnSave: false,
  //代理
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://127.0.0.1:3000',
        target: 'http://124.221.199.51:3000',
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
