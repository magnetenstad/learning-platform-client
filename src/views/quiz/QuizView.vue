<template>
  <div class="row">
    <h1>Quiz: {{ store.quiz.subject }}</h1>
    <div>
      <button @click="router.push({ name: 'edit' })">Edit</button>
    </div>
  </div>

  <p v-if="store.quiz.questions.length == 0">
    Go <router-link to="/edit">add some questions</router-link>!
  </p>

  <div v-for="(q, i) in store.quiz.questions">
    <hr />
    <QuestionForm
      :question="q"
      :index="i + 1"
      @submit="submit"
      :submitDisabled="submitDisabled"
    ></QuestionForm>
  </div>
  <div>
    <p>Score: {{ store.getScorePercentage }}</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Question, useQuizStore } from '@/stores/quiz'
import QuestionForm from './components/QuestionForm.vue'
import { router } from '@/router'
import { RouterLink } from 'vue-router'

const store = useQuizStore()
const submitDisabled = ref(false)

const submit = async (question: Question) => {
  submitDisabled.value = true
  question.comment = 'Loading..'
  await store.requestGrade(store.quiz.subject, question)
  submitDisabled.value = false
}

onMounted(() => {
  store.readQuestionsFromInput()
})
</script>
