import * as type from './mutation-types'
export default {
  [type.SET_MENUS](state, menus) {
    state.menus = menus
  },
  [type.SET_MENUS_ROUTES](state, menus) {
    state.menus_routes = menus
  },
  [type.SET_SIDEBAR_ROUTES](state, routes) {
    state.sidebar_routes = routes
  }
}