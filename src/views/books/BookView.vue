<template>
  <div v-if="bookStore.getBook">
    <h1>Book {{ bookStore.getBook.name }}</h1>
    <div v-for="chapter in bookStore.getBook.chapters">
      <router-link
        :to="`/book/${bookStore.getBook.name}/chapter/${chapter.name}`"
      >
        {{ chapter.name }}
      </router-link>
    </div>
  </div>
  <div v-else>
    <h1>Could not find the book {{ bookStore.params.book }}</h1>
  </div>
</template>

<script lang="ts" setup>
import { useBookStore } from '@/stores/books'
import { onMounted, watch } from 'vue'
import { RouterLink } from 'vue-router'

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
</script>
