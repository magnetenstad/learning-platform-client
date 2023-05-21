<template>
  <h1>Quiz: {{ store.quiz.name }}</h1>

  <div v-for="(q, i) in store.quiz.questions">
    <hr />
    <QuestionForm
      :name="store.quiz.name"
      :question="q"
      :index="i + 1"
      @submit="submit"
      :submitDisabled="submitDisabled"
    ></QuestionForm>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Question, useQuizStore } from '@/stores/quiz'
import QuestionForm from './components/QuestionForm.vue'

const store = useQuizStore()
const submitDisabled = ref(false)

const submit = async (question: Question) => {
  submitDisabled.value = true
  question.evaluation = 'Loading..'
  question.evaluation = await store.requestGrade(store.quiz.name, question)
  submitDisabled.value = false
}

onMounted(() => {
  store.readQuestionsFromInput()
})
</script>
