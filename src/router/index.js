import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/trip/:tripId',
      name: 'TripDetailView',
      component: () => import('@/views/TripDetailView.vue'),
    },
  ],
})

export default router
