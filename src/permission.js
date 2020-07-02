import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条样式
import Cookies from 'js-cookie'

const whiteList = ['/login'] // 不重定向白名单
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  const token = Cookies.get('T-ADMIN')
  // 可以取消验权直接登录
  if (token) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (Cookies.get('T-ADMIN')) {
        // if(PermissionModule.routes.length === 0){
        //   await PermissionModule.GenerateRoutes(userinfo.menus)//将菜单存入vuex（向后端发请求，获取路由）
        //   router.addRoutes(PermissionModule.dynamicRoutes)
        //   next()
        //   NProgress.done()
        // }else{
        next()
        NProgress.done()
        // }

      } else {
        Cookies.remove('T-ADMIN')
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