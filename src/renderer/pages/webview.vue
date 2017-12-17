<template>
<webview :src="src" class="webview" ref="webview" allowpopups></webview>
</template>
<script>
export default {
  data () {
    return {
      src: process.env.APP_URL || 'https://www.baidu.com',
      webview: null
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
      }
    }
  },
  mounted () {
    this.$root.webview = this.webview = this.$refs['webview']
    this.init()
  }
}
</script>
<style type="text/css">
  .webview{
    display: flex;
    height: 100%;
    width: 100%;
  }
</style>
