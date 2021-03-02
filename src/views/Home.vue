<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-22 18:01:50
-->
<template>
  <div class="main">
    <user></user>
    {{ $t('管理自动续费') }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import user from '@/components/user.vue'
@Component({
  name: 'Home',
  components: {
    user
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.main {
  color: #000000;
  font-size: 20px;
  padding-bottom: 15px;
}
</style>
