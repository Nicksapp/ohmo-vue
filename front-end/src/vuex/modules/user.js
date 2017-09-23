import {LOGIN_USER, LOGIN_USER_FAILURE, LOGOUT_USER} from '../mutation-types'

const state = {
    username: '',
    email: '',
    createdAt: '',
    isLogin: false
}

const mutations = {
    [LOGIN_USER] (state, data) {
        state.username = data.username
        state.email = data.email
        state.createdAt = data.createdAt
        state.isLogin = true
    },
    [LOGIN_USER_FAILURE] (state) {
        return state
    },
    [LOGOUT_USER] (state) {
        state.username = ''
        state.email = ''
        state.createdAt = ''
        state.isLogin = false
    }
}

export default {
    state,
    mutations
}