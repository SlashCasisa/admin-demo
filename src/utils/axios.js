import * as axios from 'axios';
import {
  Message
} from 'element-ui'
import router from '@/router'
import NProgress from 'nprogress' // Progress 进度条
import {
  getToken
} from '@/utils/cookies/token.js'
// 这里可根据具体使用的UI组件库进行替换
/* baseURL 按实际项目来定义 */
// const baseURL = process.env.VUE_APP_URL;

const baseURL = 'http://127.0.0.1:3000/'

/* 创建axios实例 */
const service = axios.default.create({
  baseURL,
  timeout: 0, // 请求超时时间
  maxContentLength: 4000,
});
// request拦截器
service.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers['token'] = token
  }
  return config;
}, (error) => {
  console.log(error) // for debug
  Promise.reject(error);
});
let isprompt = false;
// response 拦截器
service.interceptors.response.use(
  (response) => {
    if (response.status !== 200) {
      console.log('请求错误！');
    } else {
      return response.data;
    }
  },
  (error) => {
    console.dir(error) // for debug
    // if (process.env.NODE_ENV !== 'development') {
    if (error.response.status === 401) {
      if (isprompt) return
      isprompt = true
      Message({
        message: '用户登陆已失效，请重新登陆',
        type: 'error',
        duration: 3000,
        onClose: () => {
          isprompt = false
        }
      })
      // removeToken()
      location.replace(location.protocol + '//' + location.hostname + ':' + `${location.port === '80' ? '' : location.port}`)
      NProgress.done()
      return
    } else if (error.response.status === 403) { // 权限不足
      router.push('/404')
    }
    // }
    return Promise.reject(error);
  });

export default service;