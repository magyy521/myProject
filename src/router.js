import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'
import Order from './pages/Order.vue'
import Record from './pages/Record.vue'
import My from './pages/My.vue'
import ChooseType from './pages/ChooseType.vue'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/record',
      name: 'record',
      component: Record
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/choosetype',
      name: 'choosetype',
      component: ChooseType
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    // {
    //   path: '/page1',
    //   name: 'page1',
    //   component: Page1
    // },
  ]
})
