import { RadioButton } from '@/components/RadioButtons.vue'
import { defineStore } from 'pinia'

export type Question = {
  question: string
  choices: RadioButton[]
}

export type Quiz = {
  name: string
  questions: Question[]
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizes: [] as Quiz[],
    activeQuiz: null as Quiz | null,
  }),

  actions: {},
})
