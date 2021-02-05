/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 17:13:23
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2020-12-03 09:43:03
 */
import axios, { AxiosResponse } from 'axios'
import { baseURL } from '@/config'
import { Toast } from 'vant'

const service = axios.create({
  baseURL,
  timeout: 100000
})
function _log(response: AxiosResponse<any>) {
  if (process.env.NODE_ENV === 'development') {
    console.log('*==== 请求信息 ====*')
    console.log('地址：', response.config.method, response.config.url)
    const data = response.config.data

    if (data && JSON.stringify(data) != '"{}"') {
      Object.keys(data).length > 0 && console.log('请求参数：', data)
    }
    console.log('响应结果：', response.data)
    console.log('响应配置：', response.config)
    console.log('-------------------------------------------')
  }
}
service.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded'

service.interceptors.response.use(
  function(response) {
    _log(response)
    // 对响应数据做点什么
    const data = response.data as IResponse
    if (response.status === 200) {
      if (data.code == '200') {
        return response.data
      } else if (data.code == '100003') {
        Toast(data.msg)
        return Promise.reject(data)
      } else {
        Toast(data.msg)
        return Promise.reject(data)
      }
    } else {
      Toast(`服务异常【${response.status}】`)
      return Promise.reject(response)
    }
  },
  function(error: Error) {
    // 对响应错误做点什么
    console.log(error)
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)

export default service
