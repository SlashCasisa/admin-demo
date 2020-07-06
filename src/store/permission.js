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
        // // 遍历权限路由数组
        // const accessedRoutes = asyncRouter.filter(v => {

        //   // 判断如果后台返回的权限中包含admin就是管理员，可以进入权限路由页面
        //   // if (data.indexOf('admin') >= 0) return true

        //   // 之后就是调用hasPerMission函数对象权限动态路由和后台返回的用户权限进行严格匹配
        //   if (hasPerMission(data, v)) {
        //     console.log(data, 'data', v, 'v')
        //     // 判断是否有权限路由是否有子路由，有子路由继续遍历
        //     if (v.children && v.children.length > 0) {
        //       v.children = v.children.filter(child => {

        //         // 对权限子路由和后台返回的用户权限数据，在进行匹配，匹配成功返回 
        //         if (hasPerMission(data, child)) {
        //           return child
        //         }

        //         // 失败返回false
        //         return false
        //       })

        //       // 并且要把权限的父路由返回来，不光要把权限子路由返回，无论权限子路有还是没有，都应该把权限父路由返回来
        //       return v
        //     } else {

        //       // 权限父路由匹配成功返回
        //       return v
        //     }
        //   }

        //   // 如果每一个判断都没有进，说明该用户没有任何权限，返回false
        //   // return false
        // })
        console.log(accessedRoutes, 'accessedRoutes')
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