import { createRouter, createWebHistory } from 'vue-router';
import { useLoadingStore } from '@/stores/loading';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/404',
      name: 'error404',
      component: () => import('../views/Error404.vue'),
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('../views/ProductsView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/productsclass',
      name: 'productsclass',
      component: () => import('../views/ProductsClass.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/groupdetail',
      name: 'groupdetail',
      component: () => import('../views/GroupDetail.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/cookbook',
      name: 'cookbook',
      component: () => import('../views/CookbookView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/cookbookclass',
      name: 'cookbookclass',
      component: () => import('../views/CookbookClassView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: () => import('../views/CommentView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/OrderView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/prodgroup',
      name: 'prodgroup',
      component: () => import('../views/ProdGroup.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/producttag',
      name: 'prodtuctag',
      component: () => import('../views/ProductTag.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/productfeature',
      name: 'prodtuctfeature',
      component: () => import('../views/ProductFeature.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/member',
      name: 'member',
      component: () => import('../views/MemberView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/memberlevel',
      name: 'memberlevel',
      component: () => import('../views/MemberLevel.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameQ.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/coupon',
      name: 'coupon',
      component: () => import('../views/CouponView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/banner',
      name: 'banner',
      component: () => import('../views/BannerView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/master',
      name: 'master',
      component: () => import('../views/MasterView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/articles',
      name: 'articles',
      component: () => import('../views/ArticleView.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/articleclass',
      name: 'articleclass',
      component: () => import('../views/ArticleClass.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/faq',
      name: 'faq',
      component: () => import('../views/Faq.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/faqclass',
      name: 'faqclass',
      component: () => import('../views/FaqClass.vue'),
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/articlesuggest',
      name: 'articlesuggest',
      component: () => import('../views/ArticleSuggest.vue'),
      meta: {
        requiresAuth: true,
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const LoadingStore = useLoadingStore();
  LoadingStore.showLoading();

  const isAuthenticated = localStorage.getItem('userToken');
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({ name: 'error404' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach(() => {
  const LoadingStore = useLoadingStore();
  LoadingStore.hideLoading();
});

export default router;

