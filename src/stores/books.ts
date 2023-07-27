import { api } from '@/router'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { Correctness, Quiz } from './quiz'

export type Book = {
  name: string
  chapters: Chapter[]
}

export type Chapter = {
  name: string
  text: string
  quiz?: Quiz
}

export const useBookStore = defineStore('books', {
  state: () => ({
    books: [] as Book[],
    params: {
      book: '',
      chapter: '',
    },
  }),

  actions: {
    async fetchBooks() {
      if (this.books.length > 0) return
      this.books = (
        ((await (await fetch(`${api}/bookshelf`)).json()).books as string[]) ??
        []
      ).map(name => ({
        name,
        chapters: [],
      }))
    },
  },

  getters: {
    getBook(state): Book | undefined {
      return state.books.find(b => b.name == state.params.book)
    },
    getChapter(state): Chapter | undefined {
      return this.getBook?.chapters.find(c => c.name == state.params.chapter)
    },
  },
})

export const fetchChapters = async (book: Book) => {
  if (book.chapters.length > 0) return
  book.chapters = (
    ((await (await fetch(`${api}/book/${book.name}`)).json())
      .chapters as string[]) ?? []
  ).map(name => ({
    name,
    text: '',
  }))
}

export const fetchText = async (book: Book, chapter: Chapter) => {
  if (chapter.text.length > 0) return
  chapter.text =
    ((
      await (
        await fetch(`${api}/book/${book.name}/chapter/${chapter.name}`)
      ).json()
    ).text as string) ?? ''

  const questions = (await (
    await fetch(`${api}/chapter-questions`, {
      method: 'POST',
      body: JSON.stringify({
        subject: book.name,
        book: book.name,
        chapter: chapter.name,
      }),
    })
  ).json()) as { question: string; choices: string[]; correctAnswer: string }[]

  chapter.quiz = {
    subject: chapter.name,
    questions: questions.map(question => ({
      ...question,
      correctness: Correctness.Unknown,
      userAnswer: '',
    })),
    quizString: '',
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot))
}
