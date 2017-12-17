<template>
<div id="app"
  :style="{
    border: theme.windowBorder,
    'border-color': theme.windowBorderColor
  }"
  >
<el-container class="browser">
  <el-header class="browser-header" :height="theme.titleBarHeight"
    :style="{
      'line-height': theme.titleBarHeight,
      'background-color': theme.titleBarBgColor,
      'color': theme.titleBarTextColor,
      'margin-top': hideTitleBar ? ('-' + theme.titleBarHeight) : ''
    }"
    >
    <div class="browser-title">
      <img src="./assets/logo.png" alt="" class="app-icon" @click="handleShowMenu">
      <span class="app-name">{{name}}</span>
      <span class="app-title"v-if="title">&nbsp;-&nbsp;{{title}}</span>
    </div>
    <div class="header-right">
      <button class="ctrl-icon fullscreen" title="全屏切换" @click="handleFullScreen"></button>
      <button class="ctrl-icon minimize" title="最小化窗口" @click="handleMinimize"></button>
      <button class="ctrl-icon maximize" title="最大化窗口" @click="handleMaximize"></button>
      <button class="ctrl-icon close" title="关闭窗口" @click="handleClose"></button>
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
      theme: {
        titleBarHeight: (process.env.APP_TITLE_BAR_HEIGHT || 30) + 'px',
        titleBarBgColor: process.env.APP_TITLE_BAR_BGCOLOR,
        titleBarTextColor: process.env.APP_TITLE_BAR_TEXTCOLOR,
        windowBorderColor: process.env.APP_WINDOWN_BORDER_COLOR,
        windowBorder: process.env.APP_WINDOWN_BORDER
      },
      hideTitleBar: process.env.APP_TITLE_BAR_HIDE === 'true',
      sideWidth: '150px',
      name: process.env.APP_NAME,
      title: process.env.APP_TITLE,
      menu: null
    }
  },
  methods: {
    currentWindow () {
      return this.$electron.remote.getCurrentWindow()
    },
    handleFullScreen () {
      var win = this.currentWindow()
      if (win.isFullScreen()) {
        win.setFullScreen(false)
      } else {
        win.setFullScreen(true)
      }
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
      var win = this.currentWindow()
      this.$confirm('你确定要关闭应用吗？', '提示', {
        confirmButtonText: '确定关闭',
        cancelButtonText: '再看看',
        type: 'warning'
      }).then(() => {
        win.close()
      }).catch(() => {})
    },
    handleShowMenu () {
      this.menu.popup(this.currentWindow(), 0, 31)
    },
    initMenu () {
      var that = this
      var Menu = this.$electron.remote.Menu
      var MenuItem = this.$electron.remote.MenuItem
      // this.menu = Menu.setApplicationMenu(Menu.buildFromTemplate(MenuTemplate))

      var contextMenuItem = [
        {
          label: '返回',
          click: () => {
            // console.log(this)
            that.$root.webview && that.$root.webview.goBack()
          }
        },
        {
          label: '前进',
          click: () => {
            // console.log(contextMenuItem[0].enabled = false)
            that.$root.webview && that.$root.webview.goForward()
          }
        },
        {
          label: '重新加载页面',
          click () {
            that.$root.webview && that.$root.webview.reload()
          }
        },
        {type: 'separator'},
        {label: '切换全屏', role: 'togglefullscreen'},
        {
          label: '显示/隐藏标题栏',
          click () {
            that.hideTitleBar = !that.hideTitleBar
          }
        },
        {type: 'separator'},
        {label: '重新加载应用', role: 'reload'},
        {label: '强制加载应用', role: 'forcereload'},
        {label: '应用控制台', role: 'toggledevtools'},
        {type: 'separator'},
        {
          label: '审查元素',
          click () {
            if (that.$root.webview) {
              if (that.$root.webview.isDevToolsOpened()) {
                that.$root.webview.closeDevTools()
              } else {
                that.$root.webview.openDevTools()
              }
            }
          }
        }
      ]
      var contextMenu = new Menu()
      for (let i in contextMenuItem) {
        contextMenu.append(new MenuItem(contextMenuItem[i]))
      }
      if (process.env.contextmenu === 'true') {
        document.addEventListener('contextmenu', (e) => {
          contextMenu.popup(this.currentWindow(), e.x, e.y)
        })
      }
      var menu = new Menu()
      menu.append(new MenuItem({
        label: '主页',
        click () {
          if (process.env.APP_URL) {
            that.$root.webview && that.$root.webview.loadURL(process.env.APP_URL)
          } else {
            alert('主页未指定')
          }
        }
      }))
      menu.append(new MenuItem({label: '调试', submenu: contextMenuItem}))
      menu.append(new MenuItem({
        label: '视图',
        submenu: [
          {label: '缩小', role: 'zoomin'},
          {label: '放大 ', role: 'zoomout'},
          {label: '还原', role: 'resetzoom'}
        ]
      }))
      menu.append(new MenuItem({label: '切换全屏', role: 'togglefullscreen'}))
      menu.append(new MenuItem({label: '关闭退出', role: 'quit'}))
      menu.append(new MenuItem({
        label: '关于',
        click () {
          alert(process.env.APP_NAME + '\n' + process.env.APP_TITLE)
        }
      }))

      this.menu = menu
    }
  },
  created () {
    this.initMenu()
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
    /*border-bottom: solid 1px #181A1F;*/
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
  .browser-title{
    float: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
