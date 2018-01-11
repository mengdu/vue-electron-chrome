<template>
  <div class="app-info-box">
    <img src="../assets/logo.png" class="logo" alt="">
    <h1 class="title">{{title}}</h1>
    <p class="description">专为网页APP打造的全屏模式浏览器，简洁，可定制。</p>
    <ul class="info">
      <li><strong>Electron: </strong><span>{{electron}}</span></li>
      <li><strong>Chrome: </strong><span>{{chrome}}</span></li>
      <li><strong>Node: </strong><span>{{node}}</span></li>
      <li><strong>v8: </strong><span>{{v8}}</span></li>
      <!-- <li><strong>Platform: </strong><span>{{platform}}</span></li> -->
      <li><strong>Version: </strong><span>{{version}}</span></li>
    </ul>
    <p class="copyright">make by <a href="#" @click="open('https://www.github.com/mengdu')">@lanyue</a></p>
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: this.$config.APP_NAME + ' ' + this.$config.APP_TITLE,
      webview: null,
      electron: process.versions['atom-shell'],
      chrome: process.versions.chrome,
      node: process.versions.node,
      v8: process.versions.v8,
      // platform: require('os').platform(),
      version: this.$config.APP_VERSION
    }
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    }
  }
}
</script>

<style type="text/css">
  .app-info-box{
    height: 100%;
    width: 100%;
    background: #fff;
    text-align: center;
    padding: 15px;
  }
  .app-info-box .logo{
    max-width: 200px;
  }
  .app-info-box .title{
    font-size: 2.5rem;
    font-weight: 100;
  }
  .app-info-box .description{
    font-size: 1rem;
  }
  .app-info-box .info{
    margin-top: 30px;
    display: block;
  }
  .app-info-box .info:after,
  .app-info-box .info:before{
    content: "";
    display: table;
    clear: both;
  }
  .app-info-box .info li{
    display: inline-block;
    list-style: none;
    margin-right: 5px;
  }
  .app-info-box .copyright{
    margin-top: 20px;
    color: #666;
  }
</style>
