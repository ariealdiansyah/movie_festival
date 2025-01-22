import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStore } from '../stores/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/add-movies',
      name: 'AddMovieView',
      component: () => import('@/views/AddMovieView.vue'),
    },
    {
      path: '/movies/',
      name: 'MovieLists',
      component: () => import('@/views/MovieLists.vue'),
      meta: { requireAuth: true },
    },
    {
      path: '/movies/:id',
      name: 'MovieDetail',
      component: () => import('@/views/MovieDetailsView.vue'),
    },
    {
      path: '/movies/:id/edit',
      name: 'EditMovie',
      component: () => import('@/views/UpdateMovieView.vue'),
    },
    {
      path: '/most-viewed',
      name: 'MostViewed',
      component: () => import('@/views/MostViewed.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  const isAuthenticated = store.isAuthenticated
  const required = to.meta.requireAuth !== undefined
  if (required && !isAuthenticated) {
    return next({ path: '/login', query: { redirect: to.fullPath } })
  }

  next()
})

export default router
