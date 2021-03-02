/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 15:11:43
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-08 11:31:12
 */
import service from '@/utils/http'
import { baseURL } from '@/config'
/**
 * 获取用户信息
 */
export function apiGetUserInfo(
  params: any = {}
): IRes<{
  result: any
  user: any
}> {
  return service.get(baseURL + '/nn_cms/nn_cms_view/std_new/n217_a.php?nns_func=scaaa_get_user_info&nns_output_type=json', {
    params
  })
}

/**
 * 获取产品包列表
 */
export function apiGetProductList(
  params: any = {}
): IRes<{
  result: any
  product: any
}> {
  return service.get(baseURL + '/nn_cms/nn_cms_view/india/n219_a.php?nns_func=scaaa_get_buy_product_list&nns_output_type=json', {
    params
  })
}

/**
 * 获取签约信息
 */
export function apiGetSignUpInfo(
  params: any = {}
): IRes<{
  result: any
  product: any
}> {
  return service.get(baseURL + '/nn_cms/nn_cms_view/xjcbc/n60_a.php?nns_func=get_weixin_contract_by_user&nns_output_type=json', {
    params
  })
}

/**
 * 获取折扣套餐
 */
export function apiGetRulesProductList(
  params: any = {}
): IRes<{
  result: any
  product: any
}> {
  return service.get(baseURL + '/nn_cms/nn_cms_view/xjcbc/n219_a.php?nns_func=scaaa_get_product_discount_list&nns_output_type=json', {
    params
  })
}
