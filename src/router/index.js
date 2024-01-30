import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue')
    },
    {
      path: '/productsclass',
      name: 'productsclass',
      component: () => import('../views/ProductsClass.vue')
    },
    {
      path: '/groupdetail',
      name: 'groupdetail',
      component: () => import('../views/GroupDetail.vue')
    },
      path: '/cookbook',
      name: 'cookbook',
      component: () => import('../views/CookbookView.vue')
    },
    {
      path: '/cookbookclass',
      name: 'cookbookclass',
      component: () => import('../views/CookbookClassView.vue')
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../views/CommentView.vue')
    }
  ]
})

export default router
