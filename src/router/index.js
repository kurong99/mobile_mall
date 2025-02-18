import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout/'
import Login from '@/views/login'
import Detail from '@/views/detail'
import Order from '@/views/order'
import Pay from '@/views/pay'
import Seach from '@/views/search'
import ShoppingCart from '@/views/layout/shoppingcart'
import Categorys from '@/views/layout/categorys'
import User from '@/views/layout/user'
import Home from '@/views/layout/home'

// 解决重复点击路由报错问题
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          name: 'home',
          path: '/home',
          component: Home
        },
        {
          name: 'cart',
          path: '/shoppingcart',
          component: ShoppingCart
        },
        {
          name: 'categorys',
          path: '/categorys',
          props: {
            // 默认参数
            id: 0,
            nickName: 'featured_recommend'
          },
          component: Categorys
        },
        {
          name: 'user',
          path: '/user',
          component: User
        }
      ]
    },
    { name: 'login', path: '/login', component: Login },
    { name: 'detail', path: '/detail/:id', component: Detail },
    { name: 'order', path: '/order', component: Order },
    { name: 'pay', path: '/pay', component: Pay },
    { name: 'search', path: '/search', component: Seach }
  ]
})

export default router
