/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-01-12 11:19:10
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-14 17:22:51
 */
import { Module, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { callAppFunc_getSomeParams } from '@/utils/bridge'
import { BaseModule } from './base'

@Module({ dynamic: true, store, name: 'User' })
class User extends BaseModule {
  /**用户token */
  token = ''
  /**用户id */
  userId = ''
  /**设备id */
  deviceId = ''
  @Mutation
  setUserId(userId: string) {
    if (userId) this.userId = userId
  }
  @Mutation
  setDeviceId(deviceId: string) {
    if (deviceId) this.deviceId = deviceId
  }
  appVersion = ''
  @Mutation
  setAppVersion(appVersion: string) {
    if (appVersion) this.appVersion = appVersion
  }

  @Mutation
  setToken(token: string) {
    this.token = token
  }

  userType = ''
  @Mutation
  setUserType(userType: string) {
    this.userType = userType || ''
  }
  isLogin = false

  @Mutation
  setLogin(isLogin: boolean) {
    this.isLogin = isLogin
  }
  @Action
  async getToken() {
    try {
      const res = await callAppFunc_getSomeParams()
      console.log(res)

      if (res.isLogin) {
        this.setLogin(true)
      }
      this.setToken(res.newToken)
      this.setUserId(res.userId)
      this.setDeviceId(res.deviceId)
      this.setUserType(res.userType)
      this.setAppVersion(res['app-version'])
      return true
    } catch (error) {
      console.error(error)
    }
  }

  keepAlive: string[] = []

  @Mutation
  addKeepAlive(name: string) {
    if (!this.keepAlive.includes(name)) {
      this.keepAlive.push(name)
    }
  }

  network = ''
}

export const UserModule = getModule(User)
