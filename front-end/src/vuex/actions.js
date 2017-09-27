import { API_ROOT } from '../config'
import * as types from './mutation-types'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  // 获取文章列表, 现仅返回所有文章的数量
  getAllContentList ({ commit }) {
    commit(types.REQUEST_CONTENT_LIST)
    axios.get(API_ROOT + 'api/contentAll')
      .then(response => {
        // commit(types.GET_CONTENT_LIST, response.data.data)
        commit(types.GET_CONTENT_LIST_LENGTH, response.data.listLength)
      })
      .catch(error => {
        commit(types.GET_CONTENT_LIST_FAILURE, error)
      })
  },
  getContentByPage ({ commit }, page) {
    commit(types.REQUEST_CONTENT_LIST, page)
    axios.get(API_ROOT + 'api/contentlist/' + page)
      .then(response => {
        commit(types.GET_CONTENT_LIST, response.data.data)
      })
      .catch(error => {
        commit(types.GET_CONTENT_LIST_FAILURE)
      })
  },
  //  获取文章内容, 清除文章
  getArticle ({ commit }, id) {
    axios.get(API_ROOT + 'api/article/' + id)
      .then(response => {
        commit(types.GET_ARTICLE, response.data)
      })
      .catch(error => {
        commit(types.GET_ARTICLE_FAILURE, error)
      })
  },
  // 发布文章
  submitArticle( { commit }, data) {
    axios.post('http://nickj.leanapp.cn/' + 'api/article/submitArticle', data)
      .then(response => {
        commit(types.POST_ARTICLE, response.data)
      })
      .catch(error => {
        commit(types.POST_ARTICLE_FAILURE, error)
      })
  },
  
  clearArticle ({ commit }) {
    commit(types.CLEAR_ARTICLE)
  },
  // 根据 文章 id 获取 comments
  getCommentsList ({ commit }, articleId) {
    axios.get(API_ROOT + 'api/comments/' + articleId)
      .then(response => {
        commit(types.GET_COMMENTS_LIST, response.data)
      })
      .catch(error => {
        commit(types.GET_COMMENTS_LIST_FAILURE, error)
      })
  },
  // 提交评论
  submitComment ({ commit }, data) {
    axios.post('http://nickj.leanapp.cn/api/comments/submitComment', data)
      .then(response => {
        commit(types.SUBMIT_COMMENT, response.data)
      })
      .catch(error => {
        commit(types.SUBMIT_COMMENT_FAILURE, error)
      })
  },

  // 获取标签集, 获取指定标签列表
  getTags ({ commit }) {
    axios.get(API_ROOT + 'api/tags')
      .then(response => {
        commit(types.GET_TAGS, response.data)
      })
      .catch(error => {
        commit(types.GET_TAGS_FAILURE, error)
      })
  },
  getTagContentList ({ commit }, tagId) {
    axios.get(API_ROOT + 'api/tags/' + tagId)
      .then(response => {
        commit(types.GET_TAG_CONTENT_LIST, response.data, tagId)
      })
      .catch(error => {
        commit(types.GET_TAG_CONTENT_LIST_FAILURE, error)
      })
  },

  // 管理员登录
  loginUser ({ commit }, data) {
    axios.post('http://nickj.leanapp.cn/api/login', data)
      .then(response => {
        commit(types.LOGIN_USER, response.data)
      })
      .catch(error => {
        commit(types.LOGIN_USER_FAILURE, error)
      })
  },
  logoutUser ({ commit }) {
    axios.post('http://nickj.leanapp.cn/api/logout')
      .then(response => {
        commit(types.LOGOUT_USER)
        sessionStorage.clear()
      })
  }
}
