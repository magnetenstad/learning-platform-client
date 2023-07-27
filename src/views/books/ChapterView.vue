<template>
  <div v-if="bookStore.getBook && bookStore.getChapter">
    <h1>
      Book {{ bookStore.getBook.name }}, chapter
      {{ bookStore.getChapter.name }}
    </h1>
    <div v-if="!bookStore.getChapter.quiz">
      <p>Generating questions...</p>
      <p>{{ bookStore.getChapter.text }}</p>
    </div>
    <QuizForm v-else :quiz="bookStore.getChapter.quiz"></QuizForm>
  </div>
  <div v-else>
    <h1>
      Could not find the chapter {{ bookStore.params.chapter }} of the book
      {{ bookStore.params.book }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { fetchChapters, fetchText, useBookStore } from '@/stores/books'
import { onMounted, watch } from 'vue'
import QuizForm from '../quiz/components/QuizForm.vue'

const bookStore = useBookStore()

onMounted(async () => {
  if (!bookStore.getBook) {
    await bookStore.fetchBooks()
  }
})

watch(
  () => bookStore.getBook,
  async book => {
    if (book) {
      await fetchChapters(book)
    }
  },
  { immediate: true },
)

watch(
  [() => bookStore.getBook, () => bookStore.getChapter],
  async ([book, chapter]) => {
    if (book && chapter) await fetchText(book, chapter)
  },
  { immediate: true },
)
</script>
