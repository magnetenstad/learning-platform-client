import EditView from '@/views/edit/EditView.vue'
import QuizView from '@/views/quiz/QuizView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/edit', component: EditView },
  { path: '/', component: QuizView },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
