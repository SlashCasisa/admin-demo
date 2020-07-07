// 引入权限路由，和公共路由
import {
  constantRouter,
  asyncRouter
} from '@/router/index'
// 用来筛选后端返回来的权限数据，和权限路由中的meta里面的数据匹配，匹配成功返回true，失败为false

const hasPermission = (roles, route) => {
  if (route.meta && route.meta.role) {
    // return roles.some(role => route.meta.roles.includes(role))
    return route.meta.role.includes(roles)
  } else {
    return true
  }
}
export const filterAsyncRoutes = (routes, roles) => {
  const res = []
  routes.forEach(route => {
    const r = {
      ...route
    }
    if (hasPermission(roles, r) === true) {
      if (r.children) {
        r.children = filterAsyncRoutes(r.children, roles)
      }
      res.push(r)
    }
  })
  return res
}


const permission = {
  state: {
    routers: constantRouter,
    addRouters: []
  },
  mutations: {

    // 将匹配成功的权限路由拼接到公共路由中
    SET_ROUTERS(state, routers) {
      state.addRouters = routers
      console.log(state.addRouters, 'state.addRouters')
      state.routers = constantRouter.concat(routers)
    }
  },
  actions: {

    // 对后台返回来的权限和动态路由权限匹配
    GenerateRoutes({
      commit
    }, data) {

      // 返回一个异步回调promise
      return new Promise((resolve) => {
        const accessedRoutes = filterAsyncRoutes(asyncRouter, data)
        // console.log(accessedRoutes, 'accessedRoutes')
        commit('SET_ROUTERS', accessedRoutes)
        resolve()
      })
    }
  },
  getters: {

    // 只要权限路由数组发生变化就重新计算
    addRouters(state) {
      return state.addRouters
    }
  }
}
export default permission