<template>
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
}
</style>
