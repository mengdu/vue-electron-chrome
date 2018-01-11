import Vue from 'vue'
import ElementUI from 'element-ui'
import {
  ipcRenderer
} from 'electron'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/main.css'
import '@/assets/scrollbar.css'

import App from './App'
import router from './router'

import MCenterLayout from '@/components/center-layout'
// window.remote = remote
// window.win = remote.getCurrentWindow()

Vue.use(ElementUI)
Vue.use(MCenterLayout)
if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}
// 读取配置信息
var config = ipcRenderer.sendSync('get-config')

Vue.prototype.$config = config

var debug = process.env.NODE_ENV !== 'production'

Vue.config.productionTip = debug


var app = new Vue({
  components: { App },
  router,
  // store,
  template: '<App/>'
}).$mount('#app')

window.app = app
