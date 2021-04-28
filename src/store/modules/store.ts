/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-01-12 11:19:10
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-28 11:17:24
 */
import { Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { callAppFunc_getSomeParams } from '@/utils/bridge'
import { BaseModule } from './base'
import { apiGetUserInfo } from '@/api/index'
import { getProductList, getSignInfo, getRulesProductList, getAllProductList } from '@/utils/tools'

@Module({ dynamic: true, store, name: 'Store' })
class Store extends BaseModule {
  /**是否展示加载时的遮罩 */
  loadMaskShow = true
  @Mutation
  setLoadMask(loadMaskShow: boolean) {
    this.loadMaskShow = loadMaskShow
  }
  /**用户id */
  userId = ''
  @Mutation
  setUserId(userId: string) {
    if (userId) this.userId = userId
  }
  /**设备id */
  deviceId = ''
  @Mutation
  setDeviceId(deviceId: string) {
    if (deviceId) this.deviceId = deviceId
  }
  /**版本号 */
  appVersion = ''
  @Mutation
  setAppVersion(appVersion: string) {
    if (appVersion) this.appVersion = appVersion
  }
  /**用户token */
  token = ''
  @Mutation
  setToken(token: string) {
    this.token = token
  }
  /**是否已登录 */
  isLogin = false
  @Mutation
  setLogin(isLogin: boolean) {
    this.isLogin = isLogin
  }
  /**基础产品包列表 */
  productList = []
  @Mutation
  setProductList(productList: any) {
    this.productList = productList
  }
  /**折扣产品包列表 */
  productRuleList = []
  @Mutation
  setProductRuleList(productRuleList: any) {
    this.productRuleList = productRuleList
  }
  /**全部产品包列表 */
  allProductList = [
    { price: 4.9, product_desc: 20, zhehe: 0.16 },
    { price: 33.9, product_desc: 59, zhehe: 0.38 },
    { price: 69.9, product_desc: 100, zhehe: 0.39 },
    { price: 129.9, product_desc: 189, zhehe: 0.36 },
    { price: 15.9, product_desc: 20, zhehe: 0.53 },
    { price: 59, product_desc: 59, zhehe: 0.66 },
    { price: 100, product_desc: 100, zhehe: 0.56 },
    { price: 189, product_desc: 189, zhehe: 0.52 }
  ]
  @Mutation
  setAllProductList(allProductList: any) {
    this.allProductList = allProductList
  }
  /**是否已签约(续费用户) */
  isSign = false
  @Mutation
  setSign(isSign: boolean) {
    this.isSign = isSign
  }
  /**
   * 初始化方法
   */
  @Action
  async Init() {
    // 获取用户信息
    try {
      const res = await callAppFunc_getSomeParams()
      if (res.userId) {
        this.setUserId(res.userId)
        this.setToken(res.tocken)
        this.setLogin(true)
        const res1: any = await apiGetUserInfo({
          nns_user_id: res.userId,
          nns_version: res.version,
          nns_webtoken: res.tocken
        })
        console.log(res1)
      }
      this.setDeviceId(res.deviceId)
      this.setAppVersion(res.version)
    } catch (error) {
      console.error('获取用户信息错误', error)
    }
    // 未登录则展示假数据
    if (!this.isLogin) {
      // 用户未登录，展示默认状态并关闭遮罩层
      this.setLoadMask(false)
      return
    }
    // 获取基础产品包信息
    try {
      const res = await getProductList()
      this.setProductList(res)
    } catch (error) {
      console.error('获取基础产品包错误', error)
    }
    // 获取签约信息
    try {
      const res = await getSignInfo()
      this.setSign(res)
    } catch (error) {
      console.error('获取签约信息错误', error)
    }
    // 获取折扣套餐
    try {
      const res = await getRulesProductList()
      this.setProductRuleList(res)
    } catch (error) {
      console.error('获取折扣套餐错误', error)
    }
    // 融合所有产品包
    try {
      const res = await getAllProductList()
      this.setAllProductList(res)
      console.log('全部产品包', res)
    } catch (error) {
      console.error('融合产品包错误', error)
    }
    // 调用刷新方法
    // await this.Refresh()
    // 加载数据完成，关闭遮罩层
    this.setLoadMask(false)
  }
  /**
   * 刷新方法
   */
  @Action
  async Refresh() {
    try {
      const res = await callAppFunc_getSomeParams()
      if (res.userId) {
        this.setLogin(true)
        const res1: any = await apiGetUserInfo({
          nns_user_id: res.userId,
          nns_version: res.version,
          nns_webtoken: res.tocken
        })
        console.log(res1)
      }
      this.setToken(res.newToken)
      this.setUserId(res.userId)
      this.setDeviceId(res.deviceId)
      this.setAppVersion(res.version)
      return true
    } catch (error) {
      console.error(error)
    }
  }
}

export const StoreModule = getModule(Store)
