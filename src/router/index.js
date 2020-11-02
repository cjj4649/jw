import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      name: 'login',
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/page/login.vue')
    },
    {
      name: 'index',
      path: '/index',
      component: () => import(/* webpackChunkName: "index" */ '@/page/index.vue')
    },
    {
      name: 'home',
      path: '/home',
      component: () => import(/* webpackChunkName: "index" */ '@/page/home.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import(/* webpackChunkName: "index" */ '@/page/register.vue')
    },
    {
      name: 'admin',
      path: '/admin',
      component: () => import(/* webpackChunkName: "index" */ '@/page/admin.vue')
    },
  ]
})
