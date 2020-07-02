import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import './assets/iconfont/iconfont.css'; //引入Icon图标
import './assets/reset.css' //引入重置样式
import './permission.js' //权限路由控制

Vue.config.productionTip = false
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')