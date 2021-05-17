/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-02-07 14:44:58
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-14 14:40:44
 */
let connectWebViewJavascriptBridge: (callback: (bridge: Window['WebViewJavascriptBridge']) => void) => void
if (window.location.href.indexOf('iOS') !== -1) {
  // iOS13 及其以上版本
  connectWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function() {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.registerHandler('JS Echo', function(data, responseCallback) {
      // console.log('JS Echo called with:', data)
      responseCallback(data)
    })
    bridge.callHandler('ObjC Echo', { key: 'value' }, function responseCallback(responseData) {
      // console.log('JS received response:', responseData)
    })
  })
} else {
  // 安卓 和 iOS13 以下及其版本
  connectWebViewJavascriptBridge = function(callback) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function() {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
  }
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.init()
  })
}

const methodList: string[] = []

export async function callBridgeAsync(
  name: string,
  data: string | number | object = '',
  /**超时清除 */
  overtime = true,
  /**默认10s */
  overtimes = 10000
): Promise<any> {
  // 传给客户端的参数,kixmix及koznak不转成字符串,inlive需要转成字符串
  // if (typeof data === 'object') {
  //   data = JSON.stringify(data)
  // }

  return new Promise((resolve, reject) => {
    if (methodList.length) {
      if (!methodList.includes(name)) {
        return reject({
          code: '404',
          message: `应用异常：${name}未在宿主机注册`
        })
      }
    }

    const timer = overtime
      ? setTimeout(() => {
          console.log(name, '超时')
          reject('超时')
        }, overtimes)
      : 0
    connectWebViewJavascriptBridge(function(bridge) {
      bridge.callHandler(name, data, function(response) {
        if (typeof response == 'string') {
          try {
            response = JSON.parse(response)
          } catch (e) {
            console.log(`事件${name}响应为非json字符串`)
          }
        }
        if (process.env.NODE_ENV != 'production') {
          // console.log(`事件${name}响应`, response)
        }
        overtime && clearTimeout(timer)
        if (response?.code && response.code != 200) {
          reject(response)
        }
        resolve(response)
      })
    })
  })
}

function callBridge(name: string, data: string | object = '') {
  // if (typeof data === 'object') {
  //   data = JSON.stringify(data)
  // }
  connectWebViewJavascriptBridge(function(bridge) {
    bridge.callHandler(name, data, function(response) {
      // console.log(`事件${name}响应`, response)
    })
  })
}
/**
 * 是否隐藏app的导航栏,会调用app中的'appFunc_IsHideNavBar'方法
 * @param isHidden true隐藏,false显示
 */
export function callAppFunc_IsHiddenNavagationBar(isHidden: any) {
  callBridge('appFunc_IsHideNavBar', isHidden)
}
/**
 *修改标题栏文字
 * @param data 字符串 '标题'
 */
export function callAppFunc_UpdateNavTitle(data: string) {
  callBridge('appFunc_UpdateNavTitle', data)
}

/**
 * 导航栏的返回按钮点击事件，会调用app中注册的'appFunc_Back'方法
 */
export function callAppFunc_BackBtnCallback() {
  callBridge('appFunc_Back', 'back')
}
/**
 * 获取用户信息
 * @return 用户信息
 */
export function callAppFunc_getSomeParams() {
  return callBridgeAsync('appFunc_getSomeParams') as Promise<any>
}

/**
 * 设置导航颜色
 * @param navColor 16进制颜色 #FFFFFF
 */
export function callAppFunc_setNavColor(navColor: string) {
  callBridge('appFunc_setNavColor', navColor)
}

/**
 * 开始加载动画
 */
export function callAppFunc_StartLoadingAnimation() {
  callBridge('appFunc_StartLoadingAnimation')
}

/**
 * 结束加载动画
 */
export function callAppFunc_StopLoadingAnimation() {
  callBridge('appFunc_StopLoadingAnimation')
}

/**
 * 主动获取token
 */
export function callAppFunc_CacheToken() {
  return callBridgeAsync('appFunc_CacheToken') as Promise<any>
}

/**
 * 设置导航文字颜色
 */
export function callAppFunc_setTitleFontColor(color: string) {
  return callBridgeAsync('appFunc_setTitleFontColor', color) as Promise<any>
}

/**
 * 调用登陆
 * @param type //type为'1'跳转登录页
 */
export function callAppFunc_Jump2Act(type: string) {
  return callBridge('appFunc_Jump2Act', type)
}

/**
 * 跳转方法(主要用于购买,type=800001)
 */
export function callAppFunc_Jump2KoznakVip(data: any) {
  return callBridge('appFunc_Jump2KoznakVip', data)
}

/**
 * 下载
 */
export function callAppFunc_startDown(id: string) {
  return callBridgeAsync('appFunc_startDown', id)
}

/**
 * appFunc_dbSet
 */
export function callAppFunc_dbSet(data: { key: string; value: any }) {
  return callBridgeAsync('appFunc_dbSet', data)
}

/**
 * 通知APP 刷新状态
 * data '1' 通知APP刷新用户数据
 * data 为空 从该页面离开再回来以后  需要刷新该页面  距离用户在A页面 到了B页面 然后回到A页面 需要客户端刷新A页面
 */
export function callAppFunc_IsRefresh(data: string) {
  return callBridge('appFunc_IsRefresh', data)
}
/**
 * 获取订单信息
 * 传入参数{ saveOrderFrom: 'new_year' }即为相应活动页支付的订单号
 */
export function callAppFunc_GetOrderInfo(data: any) {
  return callBridgeAsync('appFunc_GetOrderInfo', data) as Promise<any>
}
/**
 * 分享调用原生
 */
export function callAppFunc_WebShare(data: any) {
  return callBridge('callAppFunc_WebShare', data)
  // shareType: 'wechat'/'qq'/'moments',直接调用分享到微信好友，QQ，朋友圈
  // is_native: '1'分享给好友,'3'/'4'/'5'分享观影小程序/下载小程序/红包小程序
}
/**
 * 获取用户微信openid
 * @return data 当前用户登录的微信openid
 */
export function callAppFunc_JumpWeChat() {
  return callBridgeAsync('appFunc_JumpWeChat', '') as Promise<any>
}
/**
 * 获取用户信息(砍一刀活动)
 * @return data 当前用户是否是微信用户
 */
export function callAppFunc_LoginInfo() {
  return callBridgeAsync('appFunc_LoginInfo', '') as Promise<any>
}
/**
 * 拉取播放穿山甲激励视频(安卓)
 * @return data 播放回调参数
 */
export function callAppFunc_playAdVideo() {
  return callBridgeAsync('appFunc_playAdVideo', '') as Promise<any>
}
