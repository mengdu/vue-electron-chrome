<template>
<div class="webview-body">
  <div class="webview-loading" v-if="didLoading" v-loading="didLoading"></div>

    <m-center-layout v-if="!src" style="background-color: #fff">
      <m-center-layout-item>
        <app-info></app-info>
      </m-center-layout-item>
    </m-center-layout>

  <webview :src="src" v-else class="webview" ref="webview" allowpopups></webview>
</div>
</template>
<script>
import AppInfo from '@/components/app-info'
export default {
  components: {
    AppInfo
  },
  data () {
    return {
      src: this.$config.APP_URL || '',
      didLoading: false,
      isInit: true
    }
  },
  methods: {
    currentWindow () {
      return this.$electron.remote.getCurrentWindow()
    },
    init () {
      var win = this.currentWindow()
      // 如果以kiosk启动electron，html全屏切换会存在问题
      if (this.webview) {
        this.webview.addEventListener('enter-html-full-screen', () => {
          // console.log('full')
          win.setFullScreen(true)
        })
        this.webview.addEventListener('leave-html-full-screen', () => {
          // console.log('leave')
          win.setFullScreen(false)
        })
        // 连接发生变化时触发
        // this.webview.addEventListener('load-commit', () => {
        //   // console.log('load-commit')
        // })
        // this.webview.addEventListener('did-finish-load', () => {
        //   console.log('did-finish-load')
        // })
        // this.webview.addEventListener('did-fail-load', () => {
        //   console.log('did-fail-load')
        // })
        if (this.$config.didLoading) {
          this.webview.addEventListener('did-start-loading', () => {
            // console.log('did-start-loading', this.didLoading)
            this.didLoading = true
          })
          this.webview.addEventListener('did-stop-loading', () => {
            // console.log('did-stop-loading', this.didLoading)
            setTimeout(() => {
              this.didLoading = false
            }, 500)
          })
        }
        // 处理a target=_blank的连接
        this.webview.addEventListener('new-window', (e) => {
          // const protocol = require('url').parse(e.url).protocol
          // if (protocol === 'http:' || protocol === 'https:') {
          //   this.$electron.shell.openExternal(e.url)
          // }
          // window.open(e.url)
          // 在当前页面打开
          this.src = e.url
        })
      }
    }
  },
  mounted () {
    this.$root.webview = this.webview = this.$refs['webview']
    this.init()
    // this.webview && this.webview.reloadIgnoringCache()
    // console.log(this.webview.reloadIgnoringCache())
    this.webview && this.webview.addEventListener('dom-ready', () => {
      if (this.isInit && this.$config.ignoringCache) {
        this.webview.reloadIgnoringCache()
      }
      this.isInit = false
    })
  }
}
</script>
<style type="text/css">
  .webview-body,
  .webview{
    display: flex;
    height: 100%;
    width: 100%;
  }
  .webview-loading{
    position: fixed;
    height: 24px;
    width: 24px;
    z-index: 100;
    top: 2px;
    right: 0;
    left: 0;
    margin: 0 auto;
  }
  .webview-loading .el-loading-mask{
    background-color: transparent;
  }
  .webview-loading .el-loading-spinner{
    top: 0;
    margin-top: 0;
  }
  .webview-loading .el-loading-spinner .circular{
    width: 24px;
    height: 24px;
  }
</style>
