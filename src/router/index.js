import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: () => import('@/views/main/MainPage.vue')
    },
    {
      path: '/video',
      component: () => import('@/views/video/VideoPage.vue')
    },
    {
      path: '/category',
      component: () => import('@/views/category/CategoryPage.vue')
    },
    {
      path: '/user',
      component: () => import('@/views/user/UserPage.vue')
    }
  ]
})

export default router
