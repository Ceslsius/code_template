/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2020-09-08 11:54:58
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'
import 'normalize.css'
import './styles/index.scss'

import './vant'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
