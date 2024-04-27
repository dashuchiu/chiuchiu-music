import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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
    },
    {
      path: '/artist/:id',
      component: () => import('@/views/artist/index.vue')
    },
    {
      path: '/songlist/:id',
      component: () => import('@/views/songlist/SongList.vue')
    }
  ]
})

export default router
