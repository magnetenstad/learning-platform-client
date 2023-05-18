<template>
  <div class="view-container">
    <h1>Quiz: {{ quiz?.name }}</h1>
    <div v-if="!quiz">No active quiz!</div>

    <div v-else v-for="q in quiz.questions">
      <QuizForm :name="quiz.name" :question="q" @submit="submit"></QuizForm>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Question, useQuizStore } from '@/stores/quiz'
import QuizForm from './components/QuizForm.vue'

const store = useQuizStore()
const quiz = computed(() => store.activeQuiz)

const submit = async (question: Question, userAnswer: string) => {
  question.evaluation = 'Loading..'
  question.evaluation = await store.submit(question, userAnswer)
}
</script>

<style>
.view-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: fit-content;
}
</style>
