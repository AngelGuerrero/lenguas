import Dashboard from './views/Dashboard'
import Access from './views/Access'

import categories from '@/data/Categories'

export const routes = [
  { path: '', redirect: 'login' },
  { path: '*', redirect: 'login' },
  { path: '/', redirect: 'login' },
  //
  // Access
  {
    path: '/login',
    name: 'Login',
    component: Access,
    props: { selected_view: 'login' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Access,
    props: { selected_view: 'signup' }
  },
  //
  // Dashboard
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        title: 'Juego de Categorización',
        name: 'Categorization',
        component: () => import('@/components/Games/Categorization/Categorization.vue'),
        props: { p_categories: categories }
      },
      {
        path: '/dashboard/users',
        title: 'Usuarios',
        name: 'Users',
        component: () => import('@/views/Users/UsersList.vue')
      }
    ]
  }
]
