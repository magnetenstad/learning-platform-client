import { RadioButton } from '@/components/RadioButtons.vue'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type Question = {
  question: string
  userAnswer: string
  choices?: RadioButton[]
  correctAnswer?: string
  evaluation?: string
}

export type Quiz = {
  name: string
  questions: Question[]
}

const inputToQuestions = (
  questions: string,
  prevQuestions: Question[] = [],
) => {
  return questions
    .split('\n')
    .filter(q => q.trim().length > 0)
    .map(
      question =>
        ({
          question,
          userAnswer:
            prevQuestions.find(q => q.question == question)?.userAnswer ?? '',
        } as Question),
    )
}

const defaultQuestionInput = 'Can all owls fly?\nWhen do owls sleep?'

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quiz: {
      name: 'owls',
      questions: inputToQuestions(defaultQuestionInput),
    } as Quiz,
    questionInput: defaultQuestionInput,
  }),

  actions: {
    async requestGrade(name: string, question: Question) {
      if (question.userAnswer.trim().length == 0) {
        return 'Please provide an answer.'
      }
      try {
        const result = await fetch('https://owly.deno.dev/grade', {
          method: 'POST',
          body: JSON.stringify({
            question: question.question,
            correctAnswer: question.correctAnswer,
            userAnswer: question.userAnswer,
            subject: name,
          }),
        })
        return (await result.json()).result
      } catch {
        return 'Server error'
      }
    },
    readQuestionsFromInput() {
      this.quiz.questions = inputToQuestions(
        this.questionInput,
        this.quiz.questions,
      )
    },
    async requestQuestionList(subject: string) {
      if (subject.trim().length == 0) {
        return 'Please provide an subject.'
      }
      try {
        const result = await fetch('https://owly.deno.dev/question-list', {
          method: 'POST',
          body: JSON.stringify({ subject: subject }),
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
