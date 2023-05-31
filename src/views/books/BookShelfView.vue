<template>
  <h1>Bookshelf</h1>
  <router-link :to="`/book/${book.name}`" v-for="book in bookStore.books">{{
    book.name
  }}</router-link>
</template>

<script lang="ts" setup>
import { useBookStore } from '@/stores/books'
import { onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const bookStore = useBookStore()

onMounted(() => bookStore.fetchBooks())
</script>
