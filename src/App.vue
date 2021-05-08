<!--
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2020-09-04 10:59:42
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-27 11:59:45
-->
<template>
  <div>
    <div class="loadMask" v-if="loadMaskShow">
      <div class="loadGif"></div>
      <div class="loadTxt">يۈكلىنىۋاتىدۇ، تەخىر قىلىڭ</div>
    </div>
    <div
      id="app"
      :style="
        titleShow
          ? 'padding-top: 44px;padding-top: calc(constant(safe-area-inset-top) + 44px);padding-top: calc(env(safe-area-inset-top) + 44px);'
          : 'padding-top: 0;'
      "
    >
      <div class="title" v-if="titleShow">
        <div class="space"></div>
        <div class="backBtn" @click="backBtn"></div>
        <div class="word">H5标题栏</div>
      </div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { StoreModule } from '@/store/modules/store'
import { handleGetNowVersion } from '@/utils/index'
import { callAppFunc_IsHiddenNavagationBar, callAppFunc_UpdateNavTitle, callAppFunc_BackBtnCallback } from '@/utils/bridge'
@Component({
  name: 'App'
})
export default class App extends Vue {
  // 兼容3.1以下版本展示客户端标题栏
  get titleShow() {
    return handleGetNowVersion(StoreModule.appVersion) >= 310
  }
  @Watch('titleShow', {
    immediate: true,
    deep: true
  })
  onChangeTest(value: string, oldValue: string) {
    if (value) {
      callAppFunc_IsHiddenNavagationBar(true)
    } else {
      callAppFunc_IsHiddenNavagationBar(false)
      callAppFunc_UpdateNavTitle('客户端标题栏')
    }
  }
  // 页面未加载完成时展示遮罩层
  get loadMaskShow() {
    return StoreModule.loadMaskShow
  }
  /**
   * 返回按钮的点击事件，调用客户端WebView的返回方法
   * @param {*}
   */
  backBtn() {
    callAppFunc_BackBtnCallback()
  }
  /**
   * 兼容以前的使用客户端标题栏的页面,在退出时显示客户端标题栏
   * @param {*}
   */
  beforeDestroy() {
    callAppFunc_IsHiddenNavagationBar(false)
  }
}
</script>

<style lang="scss">
.loadMask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  z-index: 99999;
  .loadGif {
    position: absolute;
    top: 46%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 161px;
    height: 133.5px;
    background: url('http://kixweb.kixmix.net.cn/sources/img/weChatMini/home/loadgif.gif') no-repeat;
    background-size: 100% 100%;
  }
  .loadTxt {
    color: #000;
    font-size: px2rem(24);
    line-height: px2rem(24);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
#app {
  .title {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    height: calc(constant(safe-area-inset-top) + 44px);
    height: calc(env(safe-area-inset-top) + 44px);
    background: orange;
    .space {
      width: 100%;
      height: 0rpx;
      height: constant(safe-area-inset-top);
      height: env(safe-area-inset-top);
      background: #fff;
    }
    .backBtn {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 44px;
      height: 44px;
      background: black;
    }
    .word {
      text-align: center;
      line-height: 44px;
      font-size: 20px;
    }
  }
}
</style>
