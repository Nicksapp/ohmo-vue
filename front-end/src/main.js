// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import App from './App'
import router from './router'
import store from './vuex/store'
// import VueResource from 'vue-resource'
import fastClick from 'fastclick'
fastClick.attach(document.body)

// 改写原型链
Vue.prototype.$ajax = axios

// Vue.use(VueResource)
// Vue.http.options.emulateJSON = true

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
