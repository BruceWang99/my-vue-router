import Vue from 'vue'
import App from './App.vue'
import C2 from './components/C2.vue'
import C1 from './components/C1.vue'
import VueRouter from './vue-router'
window.addEventListener('popstate', (e) => {
  console.log('这是我们自己监听的popstate,不是vue-router', e)
}, false)
Vue.use(VueRouter) // 这里调用VueRouter的install方法

Vue.config.productionTip = false

const routes = [
  { path: '/C2', component: C2 },
  { path: '/C1', component: C1 }
]
const router = new VueRouter({
  mode: 'history',
  routes // (缩写) 相当于 routes: routes
}) // 这里调用构造函数实例化一个VueRouter
console.log('asdfasd')
// router.beforeEach((to, from, next) => {
//   console.log(to, from, '<=======')
//   // debugger;
//   next()
// })
// 这里在beforeCreate钩子中执行vue-router的一些初始化操作
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
