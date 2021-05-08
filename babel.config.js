/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-02-05 14:15:08
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-08 10:30:25
 */
module.exports = {
  presets: ['@vue/cli-plugin-babel/preset'],

  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}
