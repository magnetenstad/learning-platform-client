import EditView from '@/views/edit/EditView.vue'
import QuizView from '@/views/quiz/QuizView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useQuizStore } from './stores/quiz'

const routes = [
  { path: '/edit', name: 'edit', component: EditView },
  { path: '/', name: 'quiz', component: QuizView },
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach(async to => {
  const quizStore = useQuizStore()

  if (quizStore.quiz.subject.length == 0) {
    quizStore.quiz.subject = 'fun facts'
    await quizStore.requestQuestionList()
    return
  }

  const subject = to.query['subject']?.toString()
  if (subject && subject != quizStore.quiz.subject) {
    quizStore.quiz.subject = subject
    await quizStore.requestQuestionList()
    return
  }
})
