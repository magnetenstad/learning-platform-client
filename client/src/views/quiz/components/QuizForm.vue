<template>
  <div class="question-container">
    <p class="question-text">{{ question.question }}</p>
    <RadioButtons
      v-if="question.choices"
      name="name"
      :buttons="question.choices"
      @input="input"
    ></RadioButtons>
    <textarea
      v-if="!question.choices"
      class="question-textarea"
      @input="input"
    ></textarea>
    <p v-if="question.evaluation">Evaluation: {{ question.evaluation }}</p>
    <div class="bottom-row">
      <button @click="submit">Submit</button>
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
  max-width: 600px;
  display: flex;
  flex-direction: column;
}

.question-text {
  font-weight: bold;
}

.question-textarea {
  min-width: 400px;
  min-height: 100px;
}

.bottom-row {
  padding: 0.5em;
  display: flex;
}
</style>
