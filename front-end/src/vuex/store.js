import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'

// modules 模块分类
import contentList from './modules/contentList'
import article from './modules/article'
import commentsList from './modules/commentsList'

Vue.use(Vuex)

Vue.config.debug = true

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  actions,
  modules: {
    contentList,
    article,
    commentsList
  }
})
