/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-08 14:18:50
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-17 10:32:53
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
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

export function useDebug() {
  // 调试模式的开启控制
  if (
    window.location.href.includes('debug=true') ||
    window.navigator.userAgent.includes('debug') ||
    window.navigator.userAgent.includes('Debug') ||
    window.KIXMIX_DEBUG
  ) {
    window.KIXMIX_DEBUG = true
  }
  if (window.KIXMIX_DEBUG) {
    import(/* webpackChunkName: "vconsole" */ 'vconsole').then(value => {
      // 调试模式打开vconsole工具
      const vconsole = value.default
      new vconsole()
    })
  } else {
    // 非调试模式关闭全部打印信息
    console.log = function() {
      /* todo */
    }
    console.error = function() {
      /* todo */
    }
    console.info = function() {
      /* todo */
    }
    console.warn = function() {
      /* todo */
    }
  }

  return window.KIXMIX_DEBUG || false
}

/**
 * 获取当前版本号
 * @param {string} version
 * @returns {number} eg:310
 */
export function handleGetNowVersion(version: string = '3.1.0') {
  return Number(
    version
      .slice(0, 5)
      .replace('.', '')
      .replace('.', '')
  )
}

export function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const _utf8_encode = function(string: string) {
  string = string.replace(/\r\n/g, '\n')
  let utftext = ''
  for (let n = 0; n < string.length; n++) {
    const c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode((c >> 12) | 224)
      utftext += String.fromCharCode(((c >> 6) & 63) | 128)
      utftext += String.fromCharCode((c & 63) | 128)
    }
  }
  return utftext
}

export function encode(input: string = '') {
  const _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
  let output = ''
  let chr1, chr2, chr3, enc1, enc2, enc3, enc4
  let i = 0
  input = _utf8_encode(input)
  while (i < input.length) {
    chr1 = input.charCodeAt(i++)
    chr2 = input.charCodeAt(i++)
    chr3 = input.charCodeAt(i++)
    enc1 = chr1 >> 2
    enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
    enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
    enc4 = chr3 & 63
    if (isNaN(chr2)) {
      enc3 = enc4 = 64
    } else if (isNaN(chr3)) {
      enc4 = 64
    }
    output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4)
  }
  return output
}

/**
 * 过滤续费id
 */
const filterArr = [
  '5deb1476fb015174f2a4c6d699da9664',
  '5e1be4e337f9fb1dbdc53a9353af8ab8',
  '5e1d3bfc2b6bfc33aa097f91f60c1725',
  '5e1d3dea1993a7cf8afbafa672c1f372',
  '5e1d448a1511bbab2725f5285653ae64',
  '5de0ec8cfc405fe953a1639097b84897',
  '5e1be4e337f9fb1dbdc53a9353af8ab8',
  '5e1d3bfc2b6bfc33aa097f91f60c1725',
  '5e1d3dea1993a7cf8afbafa672c1f372',
  '5e1d448a1511bbab2725f5285653ae64',
  '5ec250002ba4bd391b7823a7a821429a',
  '5ec2502715d4f8fc90b726b2a065764b',
  '5ec2502715d4f8fc90b726b2a065764b',
  '5e85b62e325effbc5c7c79ad22d88ef1',
  '5e85b642235fd60740022d5a8bef733e',
  '5e85755a11a92e7e9f2166da1e4e3dde',
  '5e8575852759256ab3dde6d29dd5f08d',
  '5f3638c8301c0349d4346eaee842ac27',
  '5f363c5a1d00958af5c7202d99e59a58',
  '5f3f36d91315536aefd5aa394b64d3a3',
  '5f3f38432f52b4f326c5c782c58190f9'
]
export function filterRulerId(id: string = '') {
  return filterArr.includes(id)
}

/**
 * 格式化价格
 * @param value
 * @returns {string|number}
 */
export function fifterMoney(value: string = ''): string | number {
  if (!value) return value
  return parseInt(value.split('.').join(''))
}

/**
 * 获取URL中某个字符串字段
 */
export function handleGupUrl(name: string, url: string) {
  if (!url) url = location.href
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
  const regexS = '[\\?&]' + name + '=([^&#]*)'
  const regex = new RegExp(regexS)
  const results = regex.exec(url)
  return results == null ? null : results[1]
}
