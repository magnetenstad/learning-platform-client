<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/quiz">Quiz</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router'
</script>

<style scoped>
nav {
  display: flex;
  gap: 1em;

  border: 1px solid black;
  padding: 1em;
}
</style>
