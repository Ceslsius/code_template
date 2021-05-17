<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-17 10:26:23
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
import { PageReportMixin } from '@/mixins'
@Component({
  name: 'Home',
  mixins: [PageReportMixin],
  components: {
    user
  }
})
export default class Home extends Vue {
  mounted() {
    // this.$point.clickReport({
    //   pageId: 'Vip0.01Main_Applets',
    //   eventId: '小程序打开',
    //   eventType: 'vip0.01click',
    //   targetId: '0',
    //   targetName: '123',
    //   targetType: 'button',
    //   clientTime: new Date().getTime(),
    //   dataMap: {}
    // })
  }
}
</script>

<style lang="scss" scoped>
.main {
  color: #000000;
  font-size: 20px;
  padding-bottom: 15px;
}
</style>
