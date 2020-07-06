import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue' //登录页面
import layout from '@/views/admin/index.vue' //管理后台布局页面
import routerView from '@/views/admin/routerview.vue' //转路由页面
// 桌面管理
// 桌面池管理
import desktopPoolManagement from '@/views/admin/desktopManagement/desktopPoolManagement.vue'
// 桌面信息
import desktopInformation from '@/views/admin/desktopManagement/desktopPoolManagement.vue'
// test
// test1->test2
import test2 from '@/views/admin/test/test1/test2.vue'
// test1->test3->test4
import test4 from '@/views/admin/test/test1/test3/test4.vue'
// test5
import test5 from '@/views/admin/test/test5.vue'

Vue.use(VueRouter)

export const constantRouter = [
  // ===========登录页面===========
  {
    path: '/login',
    component: login,
    hidden: true,
    meta: {
      title: '登录',
      icon: 'iconqiyetupu'
    },
    name: 'login',
  },

  // =========无关页面============
  {
    path: '*',
    redirect: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
]



export const asyncRouter = [ // 异步路由
  // ===========桌面管理===========
  {
    path: '/',
    component: layout,
    meta: {
      title: '桌面管理',
      icon: 'iconqiyetupu'
    },
    name: 'desktopManagement',
    redirect: {
      path: '/desktopManagement/desktopPoolManagement'
    },
    children: [{
      path: '/desktopManagement/desktopPoolManagement',
      component: desktopPoolManagement, // 桌面池管理
      meta: {
        title: '桌面池管理',
        icon: 'iconqiyetupu'
      },
      name: 'desktopPoolManagement',
    }, {
      path: '/desktopManagement/desktopInformation',
      component: desktopInformation, // 桌面信息
      meta: {
        title: '桌面信息',
        icon: 'iconqiyetupu'
      },
      name: 'desktopInformation'
    }]
  },
  // ==========test=============
  {
    path: '/test',
    component: layout,
    meta: {
      title: '测试',
      icon: 'iconqiyetupu'
    },
    name: 'test',
    redirect: {
      path: '/test1'
    },
    children: [{
      path: '/test1',
      component: routerView,
      name: 'test1',
      meta: {
        title: 'test1',
        icon: 'iconqiyetupu'
      },
      redirect: {
        path: '/test2'
      },
      children: [{
        path: '/test2',
        component: test2,
        name: 'test2',
        meta: {
          title: 'test2',
          icon: 'iconqiyetupu'
        }
      }, {
        path: '/a',
        component: routerView,
        name: 'test3',
        meta: {
          title: 'test3',
          icon: 'iconqiyetupu'
        },
        redirect: {
          path: '/s'
        },
        children: [{
          name: 'test4',
          path: '/s',
          component: test4,
          meta: {
            title: 'test4',
            icon: 'iconqiyetupu'
          }
        }]
      }]
    }, {
      path: '/test5',
      component: test5,
      name: 'test5',
      meta: {
        title: 'test5',
        icon: 'iconqiyetupu'
      }
    }]
  },
]
const createRouter = () => new VueRouter({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouter
})
const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router