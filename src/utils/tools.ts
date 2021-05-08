/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-02-08 14:25:51
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-08 10:25:09
 */
import { apiGetProductList, apiGetRulesProductList, apiGetAutoRenewOrderList } from '@/api/index'
import { filterRulerId, fifterMoney } from '@/utils/index'
import { StoreModule } from '@/store/modules/store'
/**
 * 获取产品包信息
 * @returns {Promise<any>} 基础产品包
 */
export async function getProductList(): Promise<any> {
  const productInfo: any = await apiGetProductList({
    nns_user_id: StoreModule.userId || '',
    nns_version: StoreModule.version || '',
    nns_product_id: 'android_vip_month,android_vip_3month,android_vip_6month,android_vip_year'
  })
  const {
    result: { state, sub_state },
    product = []
  } = productInfo
  if (state === 300000 && sub_state === 300001) {
    return product
  }
}

/**
 * 获取签约信息
 * @returns {Promise<boolean>} 是否是签约用户
 */
export async function getSignInfo(): Promise<boolean> {
  const AutoList: any = await apiGetAutoRenewOrderList({
    nns_user_id: StoreModule.userId,
    nns_version: StoreModule.version,
    nns_webtoken: StoreModule.token
  })
  const {
    result: { state: states }
  } = AutoList
  if (states === 300000) {
    //自动续费订单
    const { auto_renew_order_list = [] } = AutoList
    return auto_renew_order_list.length !== 0
  } else {
    return false
  }
}

/**
 * 获取折扣产品包
 * @returns {Promise<any>} 折扣产品包
 */
export async function getRulesProductList(): Promise<any> {
  const _req: any = [], //并发请求折扣套餐信息
    _productList = StoreModule.productList,
    _productRuleList = []
  //非续费用户才去请求计费策略
  if (_productList.length > 0 && !StoreModule.isSign) {
    _productList.forEach((item: any) => {
      const _a = apiGetRulesProductList({
        nns_product_id: item.product_id,
        nns_user_id: StoreModule.userId,
        nns_version: StoreModule.version,
        nns_webtoken: StoreModule.token
      })
      _req.push(_a)
    })
    const _all: any = await Promise.all(_req)
    for (let i = 0; i < _all.length; i++) {
      const { discount_list, product_id } = _all[i]
      if (discount_list) {
        let ruleItem
        for (let j = 0; j < discount_list.length; j++) {
          const item = discount_list[j]
          const { enjoy_billing_rule_times, ruler_id } = item
          if (filterRulerId(ruler_id)) {
            continue
          }
          if (item && !ruleItem) {
            //取第一个为默认展示套餐
            ruleItem = item
          } else if (enjoy_billing_rule_times && enjoy_billing_rule_times == '1') {
            //第一次购买续费
            for (let k = j; k < discount_list.length; k++) {
              //进行判断 是否有价格更低的
              const items = discount_list[k]
              const { ruler_id } = items
              if (filterRulerId(ruler_id)) {
                continue
              }
              if (fifterMoney(ruleItem.discount) > fifterMoney(items.discount)) {
                //前一个的价钱大于当前的 那么就把当前的赋值给ruleItem
                ruleItem = items
              }
            }
          }
          if (ruleItem) {
            ruleItem.product_id = product_id
          }
        }
        _productRuleList.push(ruleItem)
      }
    }
  }
  return _productRuleList
}

/**
 * 融合所有产品包
 * @returns {Promise<any>} 全部产品包
 */
export async function getAllProductList(): Promise<any> {
  let productList = JSON.parse(JSON.stringify(StoreModule.productList)),
    productList2 = JSON.parse(JSON.stringify(StoreModule.productList))
  const productRuleList = JSON.parse(JSON.stringify(StoreModule.productRuleList))
  if (productRuleList.length === 0) {
    productList.forEach((item: any) => {
      if (item.unit === 'year') {
        const _price = item.price / 365
        item.zhehe = _price.toFixed(2)
      } else if (item.unit === 'month' && item.amount == 6) {
        const _price = item.price / 180
        item.zhehe = _price.toFixed(2)
      } else if (item.unit === 'month' && item.amount == 3) {
        const _price = item.price / 90
        item.zhehe = _price.toFixed(2)
      } else {
        const _price = item.price / 30
        item.zhehe = _price.toFixed(2)
      }
      item.is_pay = 'weixin'
      item.isAuto = false
    })
    productList = productList.sort((a: any, b: any) => a.price - b.price)
    productList.map((i: any) => {
      i.price = parseFloat(i.price)
    })
    return productList
  } else {
    //处理正常套餐
    productList2.forEach((item: any) => {
      if (item.unit === 'year') {
        const _price = item.price / 365
        item.zhehe = _price.toFixed(2)
      } else if (item.unit === '6month' && item.amount == 6) {
        const _price = item.price / 180
        item.zhehe = _price.toFixed(2)
      } else if (item.unit === '3month' && item.amount == 3) {
        const _price = item.price / 90
        item.zhehe = _price.toFixed(2)
      } else {
        const _price = item.price / 30
        item.zhehe = _price.toFixed(2)
      }
      item.is_pay = 'weixin'
      item.isAuto = false
    })
    productList2 = productList2.sort((a: any, b: any) => a.price - b.price)
    //折扣数组处理
    let zhe = []
    for (let i = 0; i < productList.length; i++) {
      const item = productList[i]
      for (let j = 0; j < productRuleList.length; j++) {
        const item_s = productRuleList[j]
        if (item.product_id == item_s.product_id) {
          item.nns_rule_id = item_s.ruler_id
          // 优惠价钱
          item.rule_discount = item_s.discount
          item.price = item_s.discount
          item.isAuto = true
          item.image_h = item_s.image_h
          if (item.unit === 'year') {
            const _price = item.price / 365
            item.zhehe = _price.toFixed(2)
          } else if (item.unit === '6month' && item.amount == 6) {
            const _price = item.price / 180
            item.zhehe = _price.toFixed(2)
          } else if (item.unit === '3month' && item.amount == 3) {
            const _price = item.price / 90
            item.zhehe = _price.toFixed(2)
          } else {
            const _price = item.price / 30
            item.zhehe = _price.toFixed(2)
          }
          zhe.push(item)
        }
      }
    }
    zhe = zhe.sort((a, b) => a.price - b.price)
    zhe.map(item => (item.is_pay = 'weixin'))
    //融合数组
    const allArr = zhe.concat(productList2)
    allArr.forEach(item => {
      if (parseInt(item.price) != parseInt(item.product_desc)) {
        item.isShow = true
      }
    })
    allArr.map(i => {
      i.price = parseFloat(i.price)
    })
    return allArr
  }
}
