<template>
  <h1>Quiz</h1>
  <div v-if="!quiz">No active quiz!</div>

  <QuizForm
    v-else
    v-for="q in quiz.questions"
    :name="quiz.name"
    :question="q"
    @submit="submit"
  ></QuizForm>
  <p v-if="evaluation">Evaluation: {{ evaluation }}</p>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { Question, useQuizStore } from '@/stores/quiz'
import QuizForm from './components/QuizForm.vue'

const store = useQuizStore()
const quiz = computed(() => store.activeQuiz)

const evaluation = ref('')
const submit = async (question: Question, userAnswer: string) => {
  evaluation.value = await store.submit(question, userAnswer)
}
</script>
