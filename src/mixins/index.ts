/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-22 19:21:25
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-01-12 12:30:28
 */
import { point } from '@/utils/point'
import { Component, Vue } from 'vue-property-decorator'

@Component
export class PageReportMixin extends Vue {
  private postPageData() {
    if (this.pageEvent) {
      const pageEvent: PageEventMap = {
        ...this.pageEvent,
        // 无法获取
        getDataTime: 0,
        outTime: new Date().getTime()
      }
      point.pageReport(pageEvent)
      return
    }
    console.warn('请配置页面上报数据')
  }
  pageEvent?: PageEventMap
  deactivated() {
    if (this.pageEvent) {
      this.postPageData()
    }
  }

  beforeDestroy() {
    if (this.pageEvent) {
      this.postPageData()
    }
  }
}
