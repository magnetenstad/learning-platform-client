<template>
  <QuizForm :quiz="quizStore.currentQuiz"></QuizForm>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { readQuestionsFromInput, useQuizStore } from '@/stores/quiz'
import QuizForm from './components/QuizForm.vue'

const quizStore = useQuizStore()

onMounted(() => {
  readQuestionsFromInput(quizStore.currentQuiz)
})
</script>
