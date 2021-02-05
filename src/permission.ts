/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 11:40:32
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-05 14:34:52
 */
import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { Route } from 'vue-router'

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to: Route, _: Route, next: () => void) => {
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
