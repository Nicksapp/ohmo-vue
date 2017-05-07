import { API_ROOT } from '../config'
import * as types from './mutation-types'
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default {
  // 获取文章列表
  getContentList ({ commit }) {
    commit(types.REQUEST_CONTENT_LIST)
    axios.get(API_ROOT + 'api/content-list')
      .then(response => {
        commit(types.GET_CONTENT_LIST, response.data)
        console.log('getContentList success');
      })
      .catch(error => {
        commit(types.GET_CONTENT_LIST_FAILURE, error)
      })
  },
  //  获取文章内容, 清除文章
  getArticle ({ commit }, id) {
    axios.get(API_ROOT + 'api/article/' + id)
      .then(response => {
        commit(types.GET_ARTICLE, response.data)
        console.log('getArticle success');
      })
      .catch(error => {
        commit(types.GET_ARTICLE_FAILURE, error)
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
        console.log(response)
        commit(types.SUBMIT_COMMENT, response.data)
      })
      .catch(error => {
        commit(types.SUBMIT_COMMENT_FAILURE, error)
      })
  }
}
