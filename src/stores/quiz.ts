import { acceptHMRUpdate, defineStore } from 'pinia'
import { useGlobalStore } from './global'
import { api } from '@/router'

export type Question = {
  question: string
  userAnswer: string
  correctness: Correctness
  choices?: string[]
  correctAnswer?: string
  comment?: string
  hint?: string
}

export type Quiz = {
  subject: string
  questions: Question[]
  quizString: string
}

export enum Correctness {
  Unknown,
  Incorrect,
  Somewhat,
  Correct,
}

const inputToQuestions = (
  questions: string,
  prevQuestions: Question[] = [],
): Question[] => {
  return questions
    .split('\n')
    .filter(q => q.trim().length > 0)
    .map(question => {
      const prevQuestion = prevQuestions.find(q => q.question == question)
      if (prevQuestion) {
        return Object.assign({}, prevQuestion)
      }
      return { question, userAnswer: '', correctness: Correctness.Unknown }
    })
}

const fetchGrade = async (name: string, question: Question) => {
  if (question.userAnswer.trim().length == 0) {
    return {
      correctness: Correctness.Unknown,
      comment: 'Please provide an answer.',
    }
  }
  try {
    const result = (await (
      await fetch(`${api}/grade`, {
        method: 'POST',
        body: JSON.stringify({
          question: question.question,
          correctAnswer: question.correctAnswer,
          userAnswer: question.userAnswer,
          subject: name,
        }),
      })
    ).json()) as { correctness: string; comment: string }

    result.correctness = result.correctness.toLowerCase()
    let correctness = Correctness.Unknown
    if (result.correctness.includes('correct')) {
      correctness = Correctness.Correct
    }
    if (result.correctness.includes('incorrect')) {
      correctness = Correctness.Incorrect
    }
    if (
      result.correctness.includes('somewhat') ||
      result.correctness.includes('partial')
    ) {
      correctness = Correctness.Somewhat
    }
    if (question.userAnswer == question.correctAnswer) {
      correctness = Correctness.Correct
    }
    return { correctness, comment: result.comment }
  } catch {
    return { correctness: Correctness.Unknown, comment: 'Server error' }
  }
}

const fetchQuestionList = async (subject: string) => {
  if (subject.trim().length == 0) {
    return 'Please provide an subject.'
  }
  try {
    const result = await fetch(`${api}/question-list`, {
      method: 'POST',
      body: JSON.stringify({ subject: subject }),
    })
    return Object.values(await result.json()).join('\n')
  } catch {
    return 'Server error'
  }
}

const fetchHint = async (name: string, question: Question) => {
  try {
    const result = (await (
      await fetch(`${api}/hint`, {
        method: 'POST',
        body: JSON.stringify({
          question: question.question,
          subject: name,
        }),
      })
    ).json()) as { hint: string }

    return result.hint
  } catch {
    return 'Server error'
  }
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    currentQuiz: {
      subject: '',
      questions: [],
      quizString: '',
    } as Quiz,
    questionInput: '',
    loading: false,
  }),
})

export const requestGrade = async (name: string, question: Question) => {
  const grade = await fetchGrade(name, question)
  question.correctness = grade.correctness
  question.comment = grade.comment
}

export const requestHint = async (name: string, question: Question) => {
  question.hint = await fetchHint(name, question)
}

export const readQuestionsFromInput = (quiz: Quiz) => {
  quiz.questions = inputToQuestions(quiz.quizString, quiz.questions)
}

export const requestQuestionList = async (quiz: Quiz) => {
  const globalStore = useGlobalStore()
  globalStore.startLoading(
    `Generating quiz about ${quiz.subject}...\nThis can take up to 20 seconds.`,
  )
  quiz.quizString = await fetchQuestionList(quiz.subject)
  readQuestionsFromInput(quiz)
  globalStore.stopLoading()
}

export const getScorePercentage = (quiz: Quiz) =>
  (
    (100 *
      quiz.questions
        .map(q => {
          switch (q.correctness) {
            case Correctness.Correct:
              return 1
            case Correctness.Somewhat:
              return 0.5
            default:
              return 0
          }
        })
        .reduce((sum: number, next) => sum + next, 0)) /
    quiz.questions.length
  ).toFixed(1) + ' %'

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useQuizStore, import.meta.hot))
}
