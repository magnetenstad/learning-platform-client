<template>
  <h1>Yay Quiz!</h1>
  <div v-if="!quiz">No active quiz!</div>

  <QuizForm
    v-else
    v-for="q in quiz.questions"
    :name="quiz.name"
    :question="q.question"
    :choices="q.choices"
  ></QuizForm>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useQuizStore } from '@/stores/quiz'
import QuizForm from './components/QuizForm.vue'

const store = useQuizStore()
const quiz = computed(() => store.activeQuiz)
</script>
