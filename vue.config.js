/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 12:06:22
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-22 11:03:42
 */
module.exports = {
  publicPath: './',
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
      config['performance'] = {
        //打包文件大小配置
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
  css: {
    extract: false,
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/mixin.scss";`
      }
    },
    requireModuleExtension: true
  }
}
