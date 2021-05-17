/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-04 17:13:23
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-14 17:25:27
 */
import axios, { AxiosResponse } from 'axios'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: '',
  timeout: 100000
})
function _log(response: AxiosResponse<any>) {
  // if (process.env.NODE_ENV === 'development') {
  //   console.log('*==== 请求信息 ====*')
  //   console.log('地址：', response.config.method, response.config.url)
  //   const data = response.config.data
  //   if (data && JSON.stringify(data) != '"{}"') {
  //     Object.keys(data).length > 0 && console.log('请求参数：', data)
  //   }
  //   console.log('响应结果：', response.data)
  //   console.log('响应配置：', response.config)
  //   console.log('-------------------------------------------')
  // }
}
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios请求发送的拦截器
service.interceptors.request.use(config => {
  return config
})
// axios请求响应的拦截器
service.interceptors.response.use(
  function(response) {
    _log(response)
    // 对响应数据做点什么
    return response.data
  },
  function(error: Error) {
    // 对响应错误做点什么
    console.log(error)
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export default service
