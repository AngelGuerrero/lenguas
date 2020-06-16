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
      path: '/games/categorizacion',
      name: 'categorizacion',
      component: () => import('@/components/Games/Categorization/Categorization.vue')
    },

    {
      path: '/admin/dashboard',
      name: 'admin',
      component: () => import('@/views/Admin/AdminView.vue')
    }
  ]
})

export default router
