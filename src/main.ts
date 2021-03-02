/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-22 17:58:36
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueI18n from 'vue-i18n'
import './permission'
import 'normalize.css'
import './styles/index.scss'
import './vant'
import { useDebug } from './utils'
Vue.prototype.$debug = useDebug()
Vue.config.productionTip = false
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'uyghur', // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    zh: require('../public/lang/zh.json'), // 中文语言包
    uyghur: require('../public/lang/uyghur.json') // 英文语言包
  }
})
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
