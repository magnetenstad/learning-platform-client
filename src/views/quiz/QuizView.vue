<template>
  <h1>Quiz: {{ store.quiz.name }}</h1>

  <div v-for="(q, i) in store.quiz.questions">
    <hr />
    <QuestionForm
      :name="store.quiz.name"
      :question="q"
      :index="i + 1"
      @submit="submit"
    ></QuestionForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Question, useQuizStore } from '@/stores/quiz'
import QuestionForm from './components/QuestionForm.vue'

const store = useQuizStore()

const submit = async (question: Question, userAnswer: string) => {
  if (!store.quiz) return
  question.evaluation = 'Loading..'
  question.evaluation = await store.requestGrade(
    store.quiz.name,
    question,
    userAnswer,
  )
}

onMounted(() => {
  store.readQuestionsFromInput()
})
</script>
