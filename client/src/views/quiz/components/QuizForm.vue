<template>
  <div>
    <p>Q: {{ question.question }}</p>
    <RadioButtons
      v-if="question.choices"
      name="name"
      :buttons="question.choices"
      @input="userAnswer = ($event.target as HTMLInputElement).value"
    ></RadioButtons>
    <textarea
      v-if="!question.choices"
      @input="userAnswer = ($event.target as HTMLInputElement).value"
    ></textarea>
    <br />
    <button @click="submit">Submit</button>
  </div>
</template>

<script lang="ts" setup>
import RadioButtons from '@/components/RadioButtons.vue'
import { Question } from '@/stores/quiz'
import { ref } from 'vue'

const props = defineProps<{
  name: string
  question: Question
}>()

const emit = defineEmits<{
  submit: [question: Question, userAnswer: string]
}>()

const userAnswer = ref('')

const submit = () => {
  emit('submit', props.question, userAnswer.value)
}
</script>
