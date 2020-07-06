import * as types from './mutation-types'
import http from '@/api/index.js'
const actions = {

  // async getMovieList({ commit }, params) {
  //   await http.getMovieList(params).then(response => {
  //     const data = response.data
  //     commit(types.GET_MOVIE_LIST, data)
  //   })
  // },
  async getMenu({
    commit
  }, data) {
    await http.getMovieList(data).then(response => {
      const data = response
      commit(types.SET_MENUS, data)
    })
  },

}

export default actions