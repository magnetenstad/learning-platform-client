<template>
  <div v-if="store.loading" class="loading-overlay">
    <p v-for="text in store.loadingText.split('\n')">{{ text }}</p>
  </div>
  <div>
    <nav>
      <router-link to="/">Quiz</router-link>
      <router-link to="/edit">Edit</router-link>
    </nav>
    <div class="view-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
import { useGlobalStore } from './stores/global'

const store = useGlobalStore()
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
</style>
