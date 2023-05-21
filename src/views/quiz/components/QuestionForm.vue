<template>
  <div class="question-container">
    <p class="question-text">
      <b v-if="index">{{ index + ') ' }}</b> {{ question.question }}
    </p>
    <RadioButtons
      v-if="question.choices"
      name="name"
      :buttons="question.choices"
      @input="input"
    ></RadioButtons>
    <textarea v-if="!question.choices" v-model="question.userAnswer"></textarea>
    <p v-if="question.evaluation">Evaluation: {{ question.evaluation }}</p>
    <br />
    <div>
      <button @click="submit" :disabled="submitDisabled">Submit</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RadioButtons from '@/components/RadioButtons.vue'
import { Question } from '@/stores/quiz'

const props = defineProps<{
  name: string
  question: Question
  index?: number
  submitDisabled?: boolean
}>()

const emit = defineEmits<{
  submit: [question: Question]
}>()

const input = (ev: Event) => {
  props.question.userAnswer = (ev.target as HTMLInputElement).value
}

const submit = () => {
  emit('submit', props.question)
}
</script>

<style scoped>
.question-container {
  display: flex;
  flex-direction: column;
  margin: 2em 0;
}

/* .question-text {
  font-weight: bold;
} */
</style>
