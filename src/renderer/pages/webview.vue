<template>
<div class="webview-body">
  <div class="webview-loading" v-if="didLoading" v-loading="didLoading"></div>
  <div class="void-box" v-if="!src">
    <m-center-layout>
      <m-center-layout-item style="text-align: center">
        <img src="../assets/logo.png" class="logo" alt="">
        <h1 class="title">{{title}}</h1>
        <p class="description">专为网页APP打造的全屏模式浏览器，简洁，可定制。</p>
        <ul class="info">
          <li><strong>Electron: </strong><span>{{electron}}</span></li>
          <li><strong>Node: </strong><span>{{node}}</span></li>
          <!-- <li><strong>Platform: </strong><span>{{platform}}</span></li> -->
          <li><strong>Version: </strong><span>{{version}}</span></li>
        </ul>
        <p class="copyright">make by <a href="#" @click="open('https://www.github.com/mengdu')">@lanyue</a></p>
      </m-center-layout-item>
    </m-center-layout>
    
  </div>
  <webview :src="src" v-else class="webview" ref="webview" allowpopups></webview>
</div>
</template>
<script>
export default {
  data () {
    return {
      src: process.env.APP_URL || '',
      title: process.env.APP_NAME + ' ' + process.env.APP_TITLE,
      webview: null,
      electron: process.versions['atom-shell'],
      node: process.versions.node,
      // platform: require('os').platform(),
      version: process.env.APP_VERSION,
      didLoading: false
    }
  },
  methods: {
    Handleduo (data) {
      // do
      console.log(data)
    },
    open (link) {
      this.$electron.shell.openExternal(link)
    },
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
        if (process.env.didLoading === 'true') {
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
  .void-box{
    height: 100%;
    width: 100%;
    background: #fff;
  }
  .void-box .title{
    font-size: 2.5rem;
    font-weight: 100;
  }
  .void-box .description{
    font-size: 1rem;
  }
  .void-box .info{
    margin-top: 50px;
    display: block;
  }
  .void-box .info:after,
  .void-box .info:before{
    content: "";
    display: table;
    clear: both;
  }
  .void-box .info li{
    display: inline-block;
    list-style: none;
    margin-right: 5px;
  }
  .void-box .copyright{
    margin-top: 30px;
    color: #666;
  }
</style>
