import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'boards',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/:boardId',
      name: 'board',
      component: () => import('../views/Board.vue'),
    },
  ],
})

export default router
