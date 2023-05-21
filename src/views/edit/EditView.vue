<template>
  <h1>Edit: {{ store.quiz.name }}</h1>
  <hr />
  <div class="col">
    <label for="name">Quiz subject</label>
    <input id="name" type="text" v-model="store.quiz.name" />
    <br />
    <label for="name">Questions</label>
    <textarea id="name" type="text" v-model="store.questionInput"></textarea>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz'

const store = useQuizStore()
</script>

<style scoped>
label {
  margin: 2em 0 1em;
}
</style>
