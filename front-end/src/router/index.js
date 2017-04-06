import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/views/Hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: function (resolve) {
        require(['@/views/Index'], resolve)
      }
    },{
      path: '/article/:id',
      name: 'article',
      component: function (resolve) {
        require(['@/views/Article'], resolve)
      }
    },{
      path: '/hello',
      name: 'Hello',
      component: Hello
    },{
      path: '/post',
      name: 'post',
      component: function (resolve) {
        require(['@/views/Post'], resolve)
      }
    }
  ]
})
