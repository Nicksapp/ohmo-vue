import { API_ROOT } from '../config'
import * as types from './mutation-types'
import axios from 'axios'

export default {
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
  }
}
