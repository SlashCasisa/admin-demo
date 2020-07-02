module.exports = {
  // baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.omdbapi.com/', //对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
}