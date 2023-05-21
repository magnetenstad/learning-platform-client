import WelcomeView from './views/welcome/WelcomeView.vue'
import QuizView from '@/views/quiz/QuizView.vue'
import EditView from '@/views/edit/EditView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { useQuizStore } from './stores/quiz'

const routes = [
  { path: '/', name: 'welcome', component: WelcomeView },
  { path: '/quiz', name: 'quiz', component: QuizView },
  { path: '/edit', name: 'edit', component: EditView },
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async to => {
  const quizStore = useQuizStore()

  const subject = to.query.subject?.toString()
  if (subject && subject != quizStore.quiz.subject) {
    quizStore.quiz.subject = subject
    quizStore.quiz.questions = []
    quizStore.questionInput = ''
    if (to.name === 'quiz') {
      await quizStore.requestQuestionList()
    }
    return
  }

  if (to.name != 'welcome' && quizStore.quiz.subject.length == 0) {
    return { name: 'welcome' }
  }
})
