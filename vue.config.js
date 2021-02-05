/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 12:06:22
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-05 14:55:10
 */
module.exports = {
  publicPath: './',
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
