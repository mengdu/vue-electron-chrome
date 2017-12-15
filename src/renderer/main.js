import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// import axios from 'axios'

import App from './App'
import router from './router'
// import store from './store'
import '@/assets/main'
import {
  ipcRenderer,
  remote
} from 'electron'

window.remote = remote
window.win = remote.getCurrentWindow()

Vue.use(ElementUI)

if (!process.env.IS_WEB) {
  Vue.use(require('vue-electron'))
}

var debug = process.env.NODE_ENV !== 'production'

// Vue.http = Vue.prototype.$http = axios
Vue.prototype.$remote = window.remote
Vue.prototype.$ipc = ipcRenderer

Vue.config.productionTip = debug


var app = new Vue({
  components: { App },
  router,
  // store,
  template: '<App/>'
}).$mount('#app')

window.app = app
