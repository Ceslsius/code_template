<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-02-07 15:48:28
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-08 12:12:37
-->
<template>
  <div class="main"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { StoreModule } from '@/store/modules/store'
@Component({
  name: 'test'
})
export default class Home extends Vue {
  mounted() {
    StoreModule.Init()
    console.log(StoreModule)
  }
}
</script>

<style lang="scss" scoped>
.main {
  background: #000000;
  padding-bottom: 15px;
}
</style>
