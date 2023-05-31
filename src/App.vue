<template>
  <div v-if="store.loading" class="loading-overlay">
    <p class="loading-text" v-for="text in store.loadingText.split('\n')">
      {{ text }}
    </p>
  </div>
  <div class="view-container">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useGlobalStore } from './stores/global'
import { watch } from 'vue'
import { router } from './router'
import { useBookStore } from './stores/books'

const store = useGlobalStore()
const bookStore = useBookStore()

watch(
  () => router.currentRoute.value.params,
  params => {
    console.log(params)
    Object.assign(bookStore.params, params)
  },
)
</script>

<style scoped>
nav {
  display: flex;
  gap: 1em;

  padding: 1em;
}

.view-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 600px;
  margin-bottom: 400px;
  padding: 1em;
}

.loading-overlay {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loading-text {
  padding: 1em;
  text-align: center;
}
</style>
