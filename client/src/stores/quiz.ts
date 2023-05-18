import { RadioButton } from '@/components/RadioButtons.vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type Question = {
  question: string
  choices?: RadioButton[]
  correctAnswer?: string
  evaluation?: string
}

export type Quiz = {
  name: string
  questions: Question[]
}

// TODO: get from server
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
const compilerQuiz: Quiz = {
  name: 'compiler',
  questions: [
    {
      question: 'What is a compiler?',
    },
    {
      question:
        'Explain why constant folding and propagation may be usefully applied several times to a given program.',
      correctAnswer:
        'Constant folding may reduce an assignment of a variable to a constant value. Propagating the constant into further expressions may reveal that their values are constant as well, so the expressions can be folded, and the new constant progagated in a second pass.',
    },
    {
      question: 'Function inlining may increase program size.',
      choices: [{ value: 'TRUE' }, { value: 'FALSE' }],
      correctAnswer: 'TRUE',
    },
  ],
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizes: [scienceQuiz, compilerQuiz] as Quiz[],
    activeQuiz: compilerQuiz as Quiz | null,
  }),

  actions: {
    async submit(question: Question, userAnswer: string) {
      if (userAnswer.trim().length == 0) {
        return 'Please provide an answer.'
      }
      try {
        const result = await fetch('http://localhost:8000/question', {
          method: 'POST',
          body: JSON.stringify({
            question: question.question,
            correctAnswer: question.correctAnswer,
            userAnswer: userAnswer,
          }),
        })
        return (await result.json()).result
      } catch {
        return 'Server error'
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot))
}
