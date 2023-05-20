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

const listToQuiz = (name: string, list: string[]) => {
  return {
    name: name,
    questions: list.map(question => ({
      question,
    })),
  }
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

const compilerQuiz1: Quiz = {
  name: 'compiler construction',
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

const compilerQuiz2 = listToQuiz('compiler construction', [
  'Briefly explain the distinction between L-attributed and S-attributed syntax-directed definitions',
  'Under what condition is the maximal fixed point solution to a dataflow problem identical to the meet-over-paths solution?',
  'How is the ε-closure of an NFA state defined?',
  'Can a language with pointer arithmetic feature automatic garbage collection? Justify your answer',
  'State two advantages obtained by function inlining',
  'How can register assignment benefit from live variable analysis?',
  'Most programs exhibit some degree of spatial and temporal locality. Explain what these two terms refer to, and how they may be exploited for efficient execution',
  'LL(k) parsing can be extended to an unbounded amount of lookahead by allowing the parser to decide the choice of production based on testing the remaining token stream against a finite set of regular languages. Does this resolve the problem with left-recursion? Explain',
  'Explain the cause and effect of heap memory fragmentation',
  'Identify the loop-invariant code in the following program fragment, and explain the benefit of moving it',
  'In C, sqrt is an external library function, whereas in FORTRAN, it is an intrinsic operation defined by the language. Briefly explain which difference this makes to an optimizing compiler when analyzing a loop like the following one',
  'Some languages feature a WHERE construct, which applies operations to arrays only where the elements meet a condition, e.g. if "a" is the array [1,2,3,4], the statement WHERE ( a < 3 ) a = a * 5 will result in the array [5,10,3,4]. Outline a procedure to translate the control flow of WHERE statements into three-address code, using the above statement as an example',
  'In dataflow analysis, what is the significance of having a monotonic transfer function?',
  'In dataflow analysis, what is the significance of having a distributive transfer function?',
  'Draw the layout of a process image at run time, labelling each part',
  'Draw the layout of an activation record, labelling each part',
  'At the instruction level, describe the steps take to execute a function call in a stack-based machine, and relate them to the layout of an activation record',
])

const statisticsQuiz: Quiz = {
  name: 'statistics',
  questions: [
    {
      question:
        'The mean and median are always equal in a symmetric distribution.',
      choices: [{ value: 'TRUE' }, { value: 'FALSE' }],
      correctAnswer: 'False',
    },
    {
      question:
        'What is the standard deviation of the data set {2, 4, 6, 8, 10}?',
      choices: [{ value: '1' }, { value: '2' }, { value: '3' }, { value: '4' }],
      correctAnswer: '3',
    },
    {
      question: 'What is the p-value in statistics?',
      correctAnswer:
        'The p-value in statistics is a measure of the evidence against a null hypothesis. It represents the probability of obtaining results as extreme or more extreme than the observed data, assuming that the null hypothesis is true. ',
    },
  ],
}

export const useQuizStore = defineStore('quiz', {
  state: () => ({
    quizes: [scienceQuiz, compilerQuiz1, statisticsQuiz] as Quiz[],
    activeQuiz: compilerQuiz2 as Quiz | null,
  }),

  actions: {
    async submit(name: string, question: Question, userAnswer: string) {
      if (userAnswer.trim().length == 0) {
        return 'Please provide an answer.'
      }
      try {
        const result = await fetch(
          'https://learning-platform.deno.dev/question',
          {
            method: 'POST',
            body: JSON.stringify({
              question: `In ${name}. ${question.question}`,
              correctAnswer: question.correctAnswer,
              userAnswer: userAnswer,
            }),
          },
        )
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
