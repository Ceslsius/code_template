/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-12-03 16:29:15
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-10 14:12:07
 */
declare interface Window {
  WVJBCallbacks: Function[]
  WebViewJavascriptBridge: IWebViewJavascriptBridge
  getInstance: (option: any) => any

  genTestUserSig: (data: any) => any
  setLogLevel: any

  tim: ITIM
  TIM: ITIMSDK
  IMConfig: {
    sdkAppId: number
    Key: string
  }

  /**搜狐ip查询接口返回数据 */
  returnCitySN?: {
    /**
     * ip地址
     */
    cip: string
    /**
     * 城市地址
     */
    cname: string
  }
  /**百度数据上报方法 */
  _hmt: {
    push(value: HmtPushParams): void
  }
}

interface NetworkInformation {
  readonly: number
  readonly effectiveType: string
  readonly onchange?: any
  readonly rtt: number
  readonly saveData: boolean
  readonly type: string
}
declare interface Navigator {
  readonly connection?: NetworkInformation
  readonly webkitConnection?: NetworkInformation
}

interface IWebViewJavascriptBridge {
  /**
   * WebViewJavascriptBridge 初始化
   */
  init: () => void
  /**
   * WebViewJavascriptBridge 注册事件
   */
  registerHandler: IRegisterHandler

  /**
   * WebViewJavascriptBridge 调用事件
   */
  callHandler: ICallHandler

  /**
   * WebViewJavascriptBridge 发送消息
   */
  send: () => void
}
type IRegisterHandler = (
  /**
   * 注册的与原生通信事件名字
   */
  name: string,
  /**
   * 原生调用的回调函数
   */
  responseCallback: (data: any, responseCallback: IResponseCallback) => void
) => void
type IResponseCallback = (data: any) => void

type ICallHandler = (name: string, data: any, responseCallback: IResponseCallback) => void
declare var KIXMIX_DEBUG: boolean

// type IResponse<T = any> = {
//   code: string
//   msg: string
//   data: T
// }
// type IRes<T = any> = Promise<IResponse<T>>

type IOldTopResponse<T = any> = {
  ret: string
  msg: string
  data: IOldResponse<T>
}
type IOldResponse<T = any> = {
  msg: string
  code: number
  info: T
}

type IOldRes<T = any> = Promise<IOldResponse<T>>
type MayNull<T> = T | null
interface HmtPushParams extends Array<string | numer> {
  /**
   * 事件类型
   */
  0: '_trackEvent'
  /**
   * 事件名称
   */
  1: string
  2: string
  3?: string
  4?: number
}
