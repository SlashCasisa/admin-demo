import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import {
  getToken,
  setMenu,
  removeToken
} from '@/utils/cookies/token.js'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = getToken()
  console.log(token, 'permission$$$')
  // 可以取消验权直接登录
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (token) {
        if (store.state.menus.length === 0) {
          store.dispatch('getUserInfo', {
            token: token
          }).then(res => {
            //   // 拿到用户后台返回的权限数据
            //   // const roles = res.role
            const menus = res.menus
            setMenu(menus)
            //   // 调用 permission.js方法中的GenerateRoutes方法，将后台返回的用户的权限数据，传递回去进行筛选处理
            store.dispatch('GenerateRoutes', menus).then(() => { // 生成可访问的路由表
              // 将筛选的权限路由数组动态挂载
              router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
              next({
                ...to,
                replace: true
              }) // hack方法 确保addRoutes添加完成
            })
          });
          console.log(router, '&&&')
          next()
          NProgress.done()
        } else {
          next()
          NProgress.done()
        }

      } else {
        removeToken()
        next(`/login`)
        NProgress.done()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})