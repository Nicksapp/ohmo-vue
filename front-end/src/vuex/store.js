// import Vue from 'vue'
// import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import actions from './actions'

// modules 模块分类
import contentList from './modules/contentList'
import article from './modules/article'
import commentsList from './modules/commentsList'
import tags from './modules/tags'
import tagContentList from './modules/tagContentList'
import user from './modules/user'

Vue.use(Vuex)

Vue.config.debug = true

 // 非生产环境下开启严格模式，用以检测是否有在 mutation 外改变 store
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  actions,
  modules: {
    contentList,
    article,
    commentsList,
    tags,
    tagContentList,
    user
  },
  plugins: process.env.NODE_ENV !== 'production'
    ? [createLogger()]
    : []
})
