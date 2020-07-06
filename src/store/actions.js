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
    await http.getMenu(data).then(response => {
      const menu = response.menus
      console.log(menu, 'dataeaaa')
      commit(types.SET_MENUS, menu)
      commit(types.SET_ROLES, response.roles)
    })
  },

}

export default actions