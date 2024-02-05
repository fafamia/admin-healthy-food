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
    {
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
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue')
    },
    {
      path: '/prodgroup',
      name: 'prodgroup',
      component: () => import('../views/ProdGroup.vue')
    },
    {
      path: '/producttag',
      name: 'prodtuctag',
      component: () => import('../views/ProductTag.vue')
    },
    {
      path: '/productfeature',
      name: 'prodtuctfeature',
      component: () => import('../views/ProductFeature.vue')
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue')
    },
    {
      path: '/memberlevel',
      name: 'memberlevel',
      component: () => import('../views/MemberLevel.vue')
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameQ.vue')
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import('../views/CouponView.vue')
    },
    {
      path: '/banner',
      name: 'banner',
      component: () => import('../views/BannerView.vue')
    },
    {
      path: '/master',
      name: 'master',
      component: () => import('../views/MasterView.vue')
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticleView.vue')
    },
    {
      path: '/articleclass',
      name: 'articleclass',
      component: () => import('../views/ArticleClass.vue')
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/Faq.vue')
    },
    {
      path: '/faqclass',
      name: 'faqclass',
      component: () => import('../views/FaqClass.vue')
    },
  ]
})

export default router
