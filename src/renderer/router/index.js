import Vue from 'vue'
import Router from 'vue-router'
import Webview from '@/pages/webview'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'webview',
      component: Webview
    }
  ]
})
