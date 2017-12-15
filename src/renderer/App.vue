<template>
<div id="app">
<el-container class="browser">
  <el-header class="browser-header" :height="headerHeight">
    <div class="header-left">
      <img src="./assets/logo.png" alt="" class="app-icon" @click="handleShowMenu">
      <span>{{name}}</span>
      <span v-if="title">&nbsp;-&nbsp;{{title}}</span>
    </div>
    <div class="header-right">
      <button class="ctrl-icon minimize" @click="handleMinimize"></button>
      <button class="ctrl-icon maximize" @click="handleMaximize"></button>
      <button class="ctrl-icon close" @click="handleClose"></button>
    </div>
  </el-header>
  <el-container>
    <!-- <el-aside class="browser-aside" :width="sideWidth">Aside</el-aside> -->
    <el-main class="browser-body">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</div>
</template>

<script>

export default {
  name: 'vue-electron-chrome',
  data () {
    return {
      sideWidth: '150px',
      headerHeight: '30px',
      name: 'Electron Browser 1.0',
      title: '全屏模式APP专用浏览器',
      menu: null
    }
  },
  methods: {
    currentWindow () {
      return this.$remote.getCurrentWindow()
    },
    handleMinimize () {
      var win = this.currentWindow()
      win.minimize()
    },
    handleMaximize () {
      var win = this.currentWindow()
      if (win.isMaximized()) {
        win.unmaximize()
      } else {
        win.maximize()
      }
    },
    handleClose () {
      // this.$ipc.send('close')
      var win = this.currentWindow()
      win.close()
    },
    handleShowMenu () {
      // console.log(this.menu)
      // if (this.showMenu) {
      //   this.menu.closePopup()
      //   this.showMenu = false
      // } else {
      //   this.showMenu = true
      // }
      this.menu.popup(this.currentWindow(), 5, 30)
    },
    initMenu () {
      var Menu = this.$remote.Menu
      var MenuItem = this.$remote.MenuItem
      // this.menu = Menu.setApplicationMenu(Menu.buildFromTemplate(MenuTemplate))
      this.menu = new Menu()
      // this.menu.append(new MenuItem({label: '关于', role: 'help'}))
      // this.menu.append(new MenuItem({label: '控制面板'}))
      this.menu.append(new MenuItem({label: '调试', submenu: [{label: 'Devtool', role: 'toggledevtools'}]}))
      this.menu.append(new MenuItem({label: '全屏', role: 'togglefullscreen'}))
      this.menu.append(new MenuItem({label: '关闭', role: 'quit'}))
    }
  },
  created () {
    this.initMenu()
    if (process.env.APP_TITLE) {
      this.title = process.env.APP_TITLE
    }
  }
}
</script>
<style type="text/css">
  #app{
    margin: 0 auto;
    position: absolute;
    width: 100%;
    height: 100%;
    border: solid 1px #181A1F;
  }
  .browser{
    height: 100%;
  }
  .browser-aside{
    background: #21252B;
    border-right: solid 1px #181A1F;
    padding: 5px;
    color: #F0F0F2;
  }
  .browser-header{
    background: #21252B;
    color: #F0F0F2;
    line-height: 30px;
    padding: 0 5px;
    font-size: 13px;
    border-bottom: solid 1px #181A1F;
    box-sizing: border-box;
    -webkit-app-region: drag;
    user-select:none;
  }
  .app-icon{
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-top: -5px;
    margin-right: 5px;
    -webkit-app-region: no-drag;
  }
  .header-left{
    float: left;
  }
  .header-right{
    float: right;
  }
  .browser-body{
    padding: 0;
  }
  .ctrl-icon{
    display: inline-block;
    outline: none;
    border: none;
    width: 12px;
    height: 12px;
    margin-right: 5px;
    border-radius: 50%;
    background: #BFBFBF;
    -webkit-app-region: no-drag;
  }
  .ctrl-icon:active{
    opacity: 0.7;
  }
  .ctrl-icon:last-child{
    margin-right: 0;
  }
  .ctrl-icon.minimize{
    background: #35CB4B;
  }
  .ctrl-icon.maximize{
    background: #FDBD41;
  }
  .ctrl-icon.close{
    background: #FC625D;
  }
</style>
