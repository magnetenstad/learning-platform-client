<template>
  <div class="view-container">
    <h1>Quiz: {{ quiz?.name }}</h1>
    <div v-if="!quiz">No active quiz!</div>

    <div v-else v-for="(q, i) in quiz.questions">
      <hr />
      <QuizForm
        :name="quiz.name"
        :question="q"
        :index="i + 1"
        @submit="submit"
      ></QuizForm>
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
  if (!quiz.value) return
  question.evaluation = 'Loading..'
  question.evaluation = await store.submit(
    quiz.value.name,
    question,
    userAnswer,
  )
}
</script>

<style>
.view-container {
  display: flex;
  flex-direction: column;
  margin: auto;
  width: fit-content;
  margin-bottom: 400px;
}
</style>
