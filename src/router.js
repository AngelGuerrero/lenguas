import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/HomeView'
import Access from './views/AccessView'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },

    {
      path: '/home',
      name: 'Home',
      component: Home
    },

    {
      path: '/access',
      name: 'Access',
      component: Access
    },

    {
      path: '/categorizacion',
      name: 'Categorizacion',
      component: () => import('@/components/Stack/StackPanelCom.vue')
    }
    // {
    //   path: '/',
    //   component: Home
    // }
  ]
})

export default router
