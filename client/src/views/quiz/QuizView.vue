<template>
  <h1>Quiz</h1>
  <div v-if="!quiz">No active quiz!</div>

  <div v-else v-for="q in quiz.questions">
    <QuizForm :name="quiz.name" :question="q" @submit="submit"></QuizForm>
    <p v-if="q.evaluation">Evaluation: {{ q.evaluation }}</p>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { Question, useQuizStore } from '@/stores/quiz'
import QuizForm from './components/QuizForm.vue'

const store = useQuizStore()
const quiz = computed(() => store.activeQuiz)

const submit = async (question: Question, userAnswer: string) => {
  question.evaluation = await store.submit(question, userAnswer)
}
</script>
