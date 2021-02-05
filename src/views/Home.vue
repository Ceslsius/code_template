<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-02-05 14:56:26
-->
<template>
  <div class="main"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'Home'
})
export default class Home extends Vue {
  mounted() {}
}
</script>

<style lang="scss" scoped>
.main {
  background: #000000;
  padding-bottom: 15px;
}
</style>
