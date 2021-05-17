/*
 * @Descripttion: 埋点文件
 * @Author: Yi Yunwan
 * @Date: 2020-09-17 14:22:03
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-17 10:25:54
 */

import axios from 'axios'
import qs from 'qs'
import { encode, guid } from './index'
import { repoetConfig } from '@/config'
import { UserModule } from '@/store/modules/user'
const http = axios.create({
  baseURL: repoetConfig.baseURL,
  timeout: 500
})
http.interceptors.request.use(config => {
  config.data = qs.stringify(config.data)
  return config
})
function sendXHR(url: string, data: any) {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('POST', url, false)
  xmlHttp.send(data)
}

function sendData(url: string, data: any) {
  const _data = qs.stringify(data)
  navigator.sendBeacon ? navigator.sendBeacon(url, _data) : sendXHR(url, _data)
}

/**
 * 埋点sdk
 */
export class Point {
  constructor(options: PointOptions) {
    const commonInfo: CommonInfo = {
      appKey: options.commonInfo.appKey || options.appKey,
      sdkVersion: '1.1',
      randomId: guid(),
      device: '',
      deviceType: '',
      system: '',
      systemVersion: '',
      network: '',
      // #ifdef H5
      ip: window.returnCitySN?.cip || '',
      cityAddr: window.returnCitySN?.cname || '',
      // #endif
      userId: UserModule.userId,
      deviceId: UserModule.deviceId,
      deviceIdV2: UserModule.deviceId,
      userType: '',
      appVersion: UserModule.appVersion,
      appChannel: '',
      operators: '',
      lang: ''
    }
    this.reportData = Object.assign({}, this.reportData, {
      type: options.appKey
    })
    this.reportData.data = Object.assign({}, this.reportData.data)
    this.reportData.data.commonInfo = Object.assign({}, this.reportData.data.commonInfo, commonInfo, options.commonInfo)
    options.config && (this.config = Object.assign({}, this.config, options.config))
    options.eventMap && this.init(options.eventMap)
  }

  private config!: ReportConfig

  private reportData!: ReportData

  /**
   * sdk初始化
   * @param eventMap
   */
  init(eventMap: PageEventMap) {
    this.pageReport(eventMap)
  }

  /**
   * 数据合并和加密
   * @param eventMap
   */
  assinReportData(eventMap: ClickEventMap | PageEventMap) {
    // 复制一个上报数据实例
    const reportData: ReportData = Object.assign({}, this.reportData)
    // 合并 eventMap
    reportData.data = Object.assign(
      {
        eventMap
      },
      reportData.data
    )
    // 需重新获取的数据重新获取
    const commonInfo: Partial<CommonInfo> = {
      network: UserModule.network,
      userId: UserModule.userId,
      deviceId: UserModule.deviceId,
      deviceIdV2: UserModule.deviceId,
      userType: UserModule.userType,
      appVersion: UserModule.appVersion
    }
    // 合并公用字段
    reportData.data.commonInfo = Object.assign({}, reportData.data.commonInfo, commonInfo)
    reportData.data.dataMap = reportData.data.eventMap.dataMap
    delete reportData.data.eventMap.dataMap
    // 加密返回
    return {
      type: reportData.type,
      data: encode(JSON.stringify(reportData.data))
    }
  }

  /**
   * 点击上报事件
   * @param eventMap
   */
  clickReport(eventMap: ClickEventMap) {
    eventMap.clientTime = new Date().getTime()
    eventMap.targetId = eventMap.targetId || '0'
    eventMap.targetName = eventMap.targetName || '0'
    eventMap.dataMap = eventMap.dataMap || {}
    const data = this.assinReportData(eventMap)
    // #ifdef H5
    sendData(`${this.config.baseURL}/click`, data)
    // #endif
    // #ifndef H5
    http.request({
      baseURL: this.config.baseURL,
      url: '/click',
      method: 'POST',
      data
    })
    // #endif
  }

  /**
   * 页面上报事件
   * @param eventMap
   */
  pageReport(eventMap: PageEventMap) {
    eventMap.getDataTime = 0
    eventMap.dataMap = eventMap.dataMap || {}
    const data = this.assinReportData(eventMap)
    // #ifdef H5
    sendData(`${this.config.baseURL}/page`, data)
    // #endif
    // #ifndef H5
    http.request({
      baseURL: this.config.baseURL,
      url: '/page',
      method: 'POST',
      data
    })
    // #endif
  }
}

export const point = new Point({
  appKey: repoetConfig.appKey,
  commonInfo: {},
  config: {
    baseURL: repoetConfig.baseURL,
    debug: repoetConfig.debug
  }
})
