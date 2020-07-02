import * as type from './mutation-types'
export default {
  [type.SET_SIDEBAR_ROUTES](state, routes) {
    state.sidebar_routes = routes
  }
}