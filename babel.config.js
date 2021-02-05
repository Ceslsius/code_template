/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-12-03 16:13:56
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2020-12-03 16:19:56
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],

  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true,
      },
      'vant',
    ],
  ],
}
