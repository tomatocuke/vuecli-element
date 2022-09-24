const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,

  devServer: {
    port: process.env.VUE_APP_PORT || 8081,
    proxy: {
      '/api': {
        target: 'http://127.0.0.0:8080', // 跨域请求的地址
        changeOrigin: true, // 开启跨域
        ws: false,
        pathRewrite: {
          // '^/api': '/' // 重写去掉api
        }
      }
    }
  }
})
