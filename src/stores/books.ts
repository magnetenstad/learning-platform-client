import { api } from '@/router'
import { acceptHMRUpdate, defineStore } from 'pinia'

export type Book = {
  name: string
  chapters: Chapter[]
}

export type Chapter = {
  name: string
  text: string
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
    async fetchChapters(book: Book) {
      if (book.chapters.length > 0) return
      book.chapters = (
        ((await (await fetch(`${api}/book/${book.name}`)).json())
          .chapters as string[]) ?? []
      ).map(name => ({
        name,
        text: '',
      }))
    },
    async fetchText(book: Book, chapter: Chapter) {
      if (chapter.text.length > 0) return
      chapter.text =
        ((
          await (
            await fetch(`${api}/book/${book.name}/chapter/${chapter.name}`)
          ).json()
        ).text as string) ?? ''
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

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBookStore, import.meta.hot))
}
