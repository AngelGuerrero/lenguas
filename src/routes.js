import Dashboard from './views/Dashboard'
import Access from './views/Access'

import categories from '@/data/Categories'

export const routes = [
  { path: '', redirect: 'dashboard' },
  { path: '/', redirect: 'dashboard' },
  {
    path: '/access',
    name: 'access',
    component: Access
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: '/',
        title: 'Juego de Categorización',
        name: 'categorization',
        component: () => import('@/components/Games/Categorization/Categorization.vue'),
        props: { p_categories: categories }
      },
      {
        path: '/dashboard/users',
        title: 'Usuarios',
        name: 'users',
        component: () => import('@/views/Users/UsersList.vue')
      }
    ]
  },

  { path: '*', redirect: 'dashboard' }
]
