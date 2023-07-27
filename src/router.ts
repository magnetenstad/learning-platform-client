import { createRouter, createWebHashHistory } from 'vue-router'
import { requestQuestionList, useQuizStore } from '@/stores/quiz'

const WelcomeView = () => import('@/views/welcome/WelcomeView.vue')
const QuizView = () => import('@/views/quiz/QuizView.vue')
const EditView = () => import('@/views/edit/EditView.vue')
const BookShelfView = () => import('@/views/books/BookShelfView.vue')
const BookView = () => import('@/views/books/BookView.vue')
const ChapterView = () => import('@/views/books/ChapterView.vue')

const routes = [
  { path: '/', name: 'welcome', component: WelcomeView },
  { path: '/quiz', name: 'quiz', component: QuizView },
  { path: '/edit', name: 'edit', component: EditView },
  { path: '/bookshelf', name: 'bookshelf', component: BookShelfView },
  { path: '/book/:book', name: 'book', component: BookView },
  {
    path: '/book/:book/chapter/:chapter',
    name: 'chapter',
    component: ChapterView,
  },
  // { path: '/:pathMatch(.*)*', name: 'not-found', redirect: '/' },
]

export const api = import.meta.env.DEV
  ? 'http://localhost:8000'
  : 'https://owly.deno.dev'

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(async to => {
  const quizStore = useQuizStore()

  const subject = to.query.subject?.toString()
  if (subject && subject != quizStore.currentQuiz.subject) {
    quizStore.currentQuiz.subject = subject
    quizStore.currentQuiz.questions = []
    quizStore.questionInput = ''
    if (to.name === 'quiz') {
      await requestQuestionList(quizStore.currentQuiz)
    }
  }
})
