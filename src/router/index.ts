/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2020-10-26 11:35:48
 */
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
