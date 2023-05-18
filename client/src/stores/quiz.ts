import { RadioButton } from '@/components/RadioButtons.vue'
import { defineStore } from 'pinia'

export type Question = {
  question: string
  choices?: RadioButton[]
  correctAnswer: string
}

export type Quiz = {
  name: string
  questions: Question[]
}

const scienceQuiz: Quiz = {
  name: 'science',
  questions: [
    {
      question:
        'Explain the concept of photosynthesis and its significance in the ecosystem.',
      correctAnswer:
        'Photosynthesis is the process by which plants convert sunlight into energy (glucose) while releasing oxygen. It is crucial for oxygen production, energy transfer in the food chain, and regulating carbon dioxide levels in the atmosphere.',
    },
  ],
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizes: [scienceQuiz] as Quiz[],
    activeQuiz: scienceQuiz as Quiz | null,
  }),

  actions: {
    async submit(question: Question, userAnswer: string) {
      const result = await fetch('http://localhost:8000/question', {
        method: 'POST',
        body: JSON.stringify({
          question: question.question,
          correctAnswer: question.correctAnswer,
          userAnswer: userAnswer,
        }),
      })
      return (await result.json()).result
    },
  },
})
