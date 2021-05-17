/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-05-17 10:23:19
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-17 10:23:20
 */
import { Point } from '@/utils/point'
import { Platform } from '@/utils'
import bus from '@/utils/bus'

declare module 'vue/types/vue' {
  interface Vue extends Point {
    $point: Point
    $platform: Platform
    $bus: typeof bus
    $debug: boolean
  }
}
