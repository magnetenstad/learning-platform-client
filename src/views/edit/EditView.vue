<template>
  <div class="row">
    <h1>Edit: {{ quizStore.currentQuiz.subject }}</h1>
    <div>
      <button @click="router.push({ name: 'quiz' })">Take quiz</button>
    </div>
  </div>
  <div class="col">
    <label for="name">Quiz subject</label>
    <input id="name" type="text" v-model="quizStore.currentQuiz.subject" />
    <br />
    <label for="name">Questions</label>
    <textarea
      id="name"
      type="text"
      v-model="quizStore.currentQuiz.quizString"
      style="height: 200px"
    ></textarea>
    <br />
    <div>
      <button @click="generate" :disabled="generateDisabled">
        {{ generateDisabled ? 'Loading..' : 'Generate based on subject' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { router } from '@/router'
import { requestQuestionList, useQuizStore } from '@/stores/quiz'
import { ref } from 'vue'

const quizStore = useQuizStore()

const generateDisabled = ref(false)

const generate = async () => {
  generateDisabled.value = true
  await requestQuestionList(quizStore.currentQuiz)
  generateDisabled.value = false
}
</script>

<style scoped>
label {
  margin: 1em 0 1em;
}
</style>
