/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-11-20 17:58:17
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-07 15:30:46
 */

import { Mutation, VuexModule } from 'vuex-module-decorators'

export class BaseModule extends VuexModule {
  @Mutation
  setState<T extends this, K extends keyof T>(options: Pick<T, K>) {
    const temp = Object.entries(options)
    for (let i = 0; i < temp.length; i++) {
      const key = temp[i][0]
      const value = temp[i][1]
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      this[key] = value
    }
  }
}
