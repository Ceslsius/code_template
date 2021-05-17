/**
 * 埋点上报数据初始化配置
 */
interface PointOptions {
  /**
   * 16位随机字符串，由后台生成，做为业务产品区分标识
   */
  appKey: string
  /**
   * 公共字段
   */
  commonInfo: Partial<CommonInfo>
  eventMap?: PageEventMap
  config?: ReportConfig
}

/**
 * 埋点上报sdk配置
 */
type ReportConfig = {
  baseURL: string
  debug?: boolean
}

/**
 * 公共字段
 */
interface CommonInfo {
  /**
   * 16位随机字符串，由后台生成，做为业务产品区分标识
   */
  appKey: string
  /**
   * 客户端一次开启到关闭完整流程标识，web一次访问流程标识
   */
  randomId: string
  /**
   * 设备型号
   * @example iPhone6s
   */
  device: string
  /**
   * 设备唯一标识符
   */
  deviceId: string
  /**
   * 设备类型
   * @example phone|pad|pc|ott
   */
  deviceType: string
  /**
   * 操作系统
   */
  system: string
  /**
   * 操作系统版本
   */
  systemVersion: string
  /**
   * 网络
   * @example 3G|4G|Wi-Fi
   */
  network: string
  /**
   * 用户ID，已登录用户必填项
   */
  userId: string
  /**
   * 用户类型
   */
  userType: string
  /**
   * app版本
   */
  appVersion: string
  /**
   * app下载渠道
   */
  appChannel: string
  /**
   * 位置信息
   */
  cityAddr: string
  /**
   * ip地址
   */
  ip: string
  /**
   * 运营商
   */
  operators: string
  /**
   * sdk版本
   */
  sdkVersion: string
  /**
   * 语言
   */
  lang: string
  /**
   * - 安卓：优先查找兄弟应用（本公司开发的应用）中生成的UUID，未安装任何兄弟应用且初次安装的自行生成UUID并保存
   * - iOS：优先为广告标识，获取不到广告标识就查找兄弟应用（本公司开发的应用）中生成的UUID，未安装任何兄弟应用且初次安装的自行生成UUID并保存
   */
  deviceIdV2: string
}

/**
 * 上报事件基本数据
 */
interface ReportEventMap {
  /**
   * 页面ID
   */
  pageId: string
  /**
   * 自定义data
   */
  dataMap?: string
  /**
   * 其他自定义上传数据
   */
  [key: string]: any
}

/**
 * 点击上报事件数据
 */
interface ClickEventMap extends ReportEventMap {
  /**
   * 页面ID
   */
  pageId: string
  /**
   * 点击事件ID
   */
  eventId: string
  /**
   * 点击事件类型
   */
  eventType: string
  /**
   * 点击内容ID
   */
  targetId?: string
  /**
   * 点击内容名称
   */
  targetName?: string
  /**
   * 点击内容类型
   */
  targetType?: string
  /**
   * 点击事件时间戳，毫秒级
   */
  clientTime?: number
  dataMap?: any
  [key: string]: any
}

/**
 * 上报事件数据
 */
interface PageEventMap extends ReportEventMap {
  /**
   * 页面ID
   */
  pageId: string
  /**
   * 页面名称
   */
  pageName: string
  /**
   * 页面类型
   */
  pageType: string
  /**
   * 进入页面时间戳，毫秒级
   */
  inTime: number
  /**
   * 离开页面时间戳，毫秒级
   */
  outTime?: number
  /**
   * 点击事件时间戳，毫秒级
   */
  getDataTime?: number
  dataMap?: any
}

/**
 * 上报数据
 */
interface ReportData {
  type: string
  data: {
    commonInfo: CommonInfo
    eventMap: PageEventMap | PageEventMap
    dataMap: any
  }
}
