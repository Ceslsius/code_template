/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-12-02 18:04:32
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2020-12-02 18:04:33
 */
type IResponse<T = any> = {
  code: string
  msg: string
  data: T
}
type IRes<T = any> = Promise<IResponse<T>>
