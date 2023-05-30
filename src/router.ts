import { createRouter, createWebHashHistory } from 'vue-router'
import { useQuizStore } from '@/stores/quiz'

const WelcomeView = () => import('@/views/welcome/WelcomeView.vue')
const QuizView = () => import('@/views/quiz/QuizView.vue')
const EditView = () => import('@/views/edit/EditView.vue')
const BooksView = () => import('@/views/books/BooksView.vue')

const routes = [
  { path: '/welcome', name: 'welcome', component: WelcomeView },
  { path: '/quiz', name: 'quiz', component: QuizView },
  { path: '/edit', name: 'edit', component: EditView },
  { path: '/books', name: 'books', component: BooksView },
  { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/welcome' },
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
  }
})
