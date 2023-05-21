<template>
  <div class="row">
    <h1>Edit: {{ store.quiz.subject }}</h1>
    <div>
      <button @click="router.push({ name: 'quiz' })">Take quiz</button>
    </div>
  </div>
  <div class="col">
    <label for="name">Quiz subject</label>
    <input id="name" type="text" v-model="store.quiz.subject" />
    <br />
    <label for="name">Questions</label>
    <textarea
      id="name"
      type="text"
      v-model="store.questionInput"
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
import { useQuizStore } from '@/stores/quiz'
import { ref } from 'vue'

const store = useQuizStore()

const generateDisabled = ref(false)

const generate = async () => {
  generateDisabled.value = true
  await store.requestQuestionList()
  generateDisabled.value = false
}
</script>

<style scoped>
label {
  margin: 1em 0 1em;
}
</style>
