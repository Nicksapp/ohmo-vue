import { GET_ARTICLE, GET_ARTICLE_FAILURE, CLEAR_ARTICLE } from '../mutation-types'

const state = {
  content: '',
  title: '',
  cover: '',
  createdAt: '',
  loading: true
}

const mutations = {
  [GET_ARTICLE] (state, data) {
    state.content = data.content
    state.title = data.title
    state.createdAt = data.createdAt
    state.cover = data.cover
    // state.loading = false
  },
  [GET_ARTICLE_FAILURE] (state) {
    return state
  },
  [CLEAR_ARTICLE] (state) {
    state.content = ''
    state.title = ''
    state.cover = ''
    state.createdAt = ''
    // state.loading = true
  },
  ['SET_LOADING_FALSE'] (state) {
    state.loading = false;
  },
  ['SET_LOADING_TRUE'] (state) {
    state.loading = true;
  }
}

export default {
  state,
  mutations
}
