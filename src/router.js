import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from './views/HomeView'
import Access from './views/AccessView'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '', component: Home },

    { path: '/home', name: 'home', component: Home },

    { path: '/access', name: 'access', component: Access },

    {
      path: '/categorizacion',
      name: 'categorizacion',
      component: () => import('@/components/Stack/StackPanelCom.vue')
    },

    {
      path: '/admin/dashboard',
      name: 'admin',
      component: () => import('@/components/Admin/AdminPanelCom.vue')
    }
  ]
})

export default router
