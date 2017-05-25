import { REQUEST_CONTENT_LIST, 
         GET_CONTENT_LIST, 
         GET_CONTENT_LIST_FAILURE, 
         POST_ARTICLE,
         POST_ARTICLE_FAILURE } from '../mutation-types'

const state = {
    isFetching: false,
    contentList: []
}

const mutations = {
    [REQUEST_CONTENT_LIST](state) {
        state.isFetching = true
    },
    [GET_CONTENT_LIST](state, items) {
        state.isFetching = false
        state.contentList = items
    },
    [GET_CONTENT_LIST_FAILURE](state) {
        state.isFetching = false
    },
    [POST_ARTICLE](state, data) {
        state.contentList.push(data)
    },
    [POST_ARTICLE_FAILURE](state) {
        return state
    }
}

export default {
    state,
    mutations
}