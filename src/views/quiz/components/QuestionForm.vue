<template>
  <div class="question-container" :style="{ color: getColor(question) }">
    <p class="question-text">
      <b v-if="index">{{ index + ') ' }}</b> {{ question.question }}
    </p>
    <RadioButtons
      v-if="question.choices"
      :name="question.question"
      :buttons="
        question.choices.map(choice => ({
          value: choice,
          label: choice,
        }))
      "
      @input="input"
    ></RadioButtons>
    <textarea v-if="!question.choices" v-model="question.userAnswer"></textarea>
    <p v-if="question.hint">Hint: {{ question.hint }}</p>
    <p v-if="question.comment">Evaluation: {{ question.comment }}</p>
    <br />
    <div style="display: flex; justify-content: space-between">
      <button @click="submit" :disabled="submitDisabled">Submit</button>
      <button @click="requestHint" :disabled="submitDisabled">
        Ask for hint
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import RadioButtons from '@/components/RadioButtons.vue'
import { Question, Correctness } from '@/stores/quiz'

const props = defineProps<{
  question: Question
  index?: number
  submitDisabled?: boolean
}>()

const emit = defineEmits<{
  submit: [question: Question]
  requestHint: [question: Question]
}>()

const input = (ev: Event) => {
  props.question.userAnswer = (ev.target as HTMLInputElement).value
}

const submit = () => {
  emit('submit', props.question)
}

const requestHint = () => {
  emit('requestHint', props.question)
}

const getColor = (question: Question) => {
  switch (question.correctness) {
    case Correctness.Unknown:
      return 'black'
    case Correctness.Incorrect:
      return 'red'
    case Correctness.Somewhat:
      return 'orange'
    case Correctness.Correct:
      return 'green'
    default:
      return 'black'
  }
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
