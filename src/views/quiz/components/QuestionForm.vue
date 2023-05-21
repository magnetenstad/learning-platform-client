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
    <textarea v-if="!question.choices" @input="input"></textarea>
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
import { ref } from 'vue'

const props = defineProps<{
  name: string
  question: Question
  index?: number
  submitDisabled?: boolean
}>()

const emit = defineEmits<{
  submit: [question: Question, userAnswer: string]
}>()

const userAnswer = ref('')

const input = (ev: Event) => {
  userAnswer.value = (ev.target as HTMLInputElement).value
}

const submit = () => {
  emit('submit', props.question, userAnswer.value)
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
