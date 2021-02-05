<!--
 * @Descripttion: 
 * @Author: Yi Yunwan
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2020-09-04 16:32:46
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App'
})
export default class App extends Vue {}
</script>

<style lang="scss"></style>
