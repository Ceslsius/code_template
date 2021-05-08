<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-08 10:31:17
-->
<template>
  <div class="user">{{ userId }}</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { StoreModule } from '@/store/modules/store'
@Component({
  name: 'user'
})
export default class User extends Vue {
  get userId() {
    return StoreModule.userId
  }
  /**
   * 相当于监听属性
   * @example
   * test:{
   *  handler: this.onChangeTest,
   *  deep: true,
   *  immediate: true
   * }
   */
  @Watch('userId', {
    immediate: true,
    deep: true
  })
  onChangeTest(value: string, oldValue: string) {
    console.log(value, oldValue)
  }
}
</script>

<style lang="scss" scoped>
.user {
  width: 375px;
  color: #000000;
  font-size: 20px;
  padding-bottom: 15px;
}
</style>
