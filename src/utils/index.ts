/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-08 14:18:50
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-05 14:38:55
 */
export function dateFormat(fmt: string, date: Date) {
  const o: any = {
    'M+': date.getMonth() + 1, //月份
    'd+': date.getDate(), //日
    'h+': date.getHours(), //小时
    'm+': date.getMinutes(), //分
    's+': date.getSeconds(), //秒
    'q+': Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

export function useDebug() {
  // 调试模式的开启控制
  if (
    window.location.href.includes('debug=true') ||
    window.navigator.userAgent.includes('debug') ||
    window.KIXMIX_DEBUG
  ) {
    window.KIXMIX_DEBUG = true
  }

  if (window.KIXMIX_DEBUG) {
    import(/* webpackChunkName: "vconsole" */ 'vconsole').then(value => {
      const vconsole = value.default
      new vconsole()
    })
  }

  return window.KIXMIX_DEBUG || false
}
