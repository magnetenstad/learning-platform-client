import HomeView from '@/views/home/HomeView.vue'
import QuizView from '@/views/quiz/QuizView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/quiz', component: QuizView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
