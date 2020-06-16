import Dashboard from './views/Dashboard'
import Access from './views/AccessView'

import categories from '@/data/categories'

export const routes = [
  { path: '', component: Dashboard },

  { path: '/access', name: 'access', component: Access },

  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    children: [
      {
        path: 'categorization',
        name: 'categorization',
        component: () => import('@/components/Games/Categorization/Categorization.vue'),
        props: { p_categories: categories }

      }
    ]
  }
]
