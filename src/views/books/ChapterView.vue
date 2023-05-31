<template>
  <div v-if="bookStore.getBook && bookStore.getChapter">
    <h1>
      Book {{ bookStore.getBook.name }}, chapter
      {{ bookStore.getChapter.name }}
    </h1>
    <p>{{ bookStore.getChapter.text }}</p>
  </div>
  <div v-else>
    <h1>
      Could not find the chapter {{ bookStore.params.chapter }} of the book
      {{ bookStore.params.book }}
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { useBookStore } from '@/stores/books'
import { onMounted, watch } from 'vue'

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
      await bookStore.fetchChapters(book)
    }
  },
  { immediate: true },
)

watch(
  [() => bookStore.getBook, () => bookStore.getChapter],
  async ([book, chapter]) => {
    if (book && chapter) await bookStore.fetchText(book, chapter)
  },
  { immediate: true },
)
</script>
