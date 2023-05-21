<template>
  <h1>Edit: {{ store.quiz.name }}</h1>
  <hr />
  <div class="col">
    <label for="name">Quiz subject</label>
    <input id="name" type="text" v-model="store.quiz.name" />
    <br />
    <label for="name">Questions</label>
    <textarea id="name" type="text" v-model="store.questionInput"></textarea>
    <br />
    <div>
      <button @click="generate" :disabled="generateDisabled">
        {{ generateDisabled ? 'Loading..' : 'Generate based on subject' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz'
import { ref } from 'vue'

const store = useQuizStore()

const generateDisabled = ref(false)

const generate = async () => {
  generateDisabled.value = true
  store.questionInput = await store.requestQuestionList(store.quiz.name)
  generateDisabled.value = false
}
</script>

<style scoped>
label {
  margin: 2em 0 1em;
}
</style>
