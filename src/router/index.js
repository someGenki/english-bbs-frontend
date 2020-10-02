import Vue from 'vue'
import VueRouter from 'vue-router'
import homeChildren from './home-children.js'
import Home from '../views/Home.vue' //正常加载
import Test from '../views/Test.vue' //正常加载
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/index',
    children: homeChildren
  },
  {
    path: '/test',
    name: 'test',
    component: Test
  },
]

// 解决 error:`Avoided redundant navigation to current location: "/index".`
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  routes, mode: 'history'
})
// 拦截器
const userSet = new Set(['collections', 'profile', 'ban']);
router.beforeEach((to, from, next) => {
  if (to.path === '/about') return next();
  if (!!localStorage.getItem('token') === false) {
    if (userSet.has(to.name)) return next('/');
  }
  if (to.path === '/ban') return next('/');//跳转到首页
  try {
    document.title = to.matched[1].meta.title || to.matched[1].name
  } catch (e) {
  }
  next();
})


export default router
