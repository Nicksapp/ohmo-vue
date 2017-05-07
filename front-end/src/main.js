// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex/store'

import ElementUI from 'element-ui'   // 完整引入
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

import fastClick from 'fastclick'
fastClick.attach(document.body) // 消除移动端双击延时

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
