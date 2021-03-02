/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 11:40:32
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-03-02 10:38:09
 */
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Route } from 'vue-router'
import { StoreModule } from '@/store/modules/store'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: Route, _: Route, next: () => void) => {
  if (to.name === 'Home') {
    StoreModule.Init()
  }
  // Start progress bar
  NProgress.start()
  next()
})

router.afterEach(async (to: Route) => {
  // Finish progress bar
  NProgress.done()
  // set page title
  document.title = to.meta.title || 'Kixmix'
})
