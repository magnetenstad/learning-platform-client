import HomeView from '@/views/home/HomeView.vue'
import QuizView from '@/views/quiz/QuizView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/quiz', component: QuizView },
  { path: '/about', component: HomeView },
  { path: '/profile', component: HomeView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
