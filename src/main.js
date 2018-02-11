// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import UserList from "./views/user/list"
import Demo from "./views/demo"
import DemoIndex from "./views/demo/demo"


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$axios=axios;
Vue.config.productionTip = false;

// 定义路由
const routes = [
  // 定义应用的根 URL
  { path: '/', component: UserList },
  { path: '/Demo', component: Demo },
  { path: '/Demo/index', component: DemoIndex }
]
// 创建 router 实例并传递 `routes` 选项
// 您可以在这里传递其他选项，
// 但现在让我们保持简单。
const router = new VueRouter({
  routes, // `routes: routes` 的简写
  mode: 'history'
})
/* eslint-disable no-new */
//实例化 vue 实例
new Vue({
// 定义根组件的选择器
  el: '#app',
  // 根组件的 template
  template: '<app></app>',
  // 声明根组件可以访问的组件
  components: { App },
  // 传入 router 到 vue 实例
  router
}).$mount('#app')// app 上装载 router
