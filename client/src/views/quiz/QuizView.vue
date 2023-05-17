<template>
  <h1>Yay Quiz!</h1>
  <QuizForm :name="name" :question="question" :choices="choices"></QuizForm>
</template>

<script lang="ts" setup>
import QuizForm from './components/QuizForm.vue'

const name = 'test'
const question = 'What on earth?'
const choices = [
  { id: '1', value: '1', label: '1' },
  { id: '2', value: '2', label: '2' },
]
</script>
