import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/index',
      name: 'Index',
      component: resolve => require(['../pages/Index.vue'], resolve),
      meta: {
        navShow: false,
        tabShow: true,
        keepAlive: true,
        title: '首页'
      }
    },
    {
      path: '/classify',
      name: 'Classify',
      component: resolve => require(['../pages/Classify.vue'], resolve),
      meta: {
        navShow: false,
        tabShow: true,
        keepAlive: true,
        title: '全部分类'
      }
    },
    {
      path: '/cart',
      name: 'Cart',
      component: resolve => require(['../pages/Cart.vue'], resolve),
      meta: {
        navShow: false,
        tabShow: true,
        keepAlive: true,
        title: '购物车'
      }
    },
    {
      path: '/user',
      name: 'User',
      component: resolve => require(['../pages/User.vue'], resolve),
      meta: {
        navShow: false,
        tabShow: true,
        keepAlive: true,
        title: '个人中心'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['../pages/Login.vue'], resolve),
      meta: {
        navShow: true,
        tabShow: false,
        keepAlive: true,
        title: '用户登陆'
      }
    }
  ]
})
