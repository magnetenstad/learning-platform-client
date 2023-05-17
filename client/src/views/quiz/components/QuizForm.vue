<template>
  <div>
    <p>Q: {{ question }}</p>
    <RadioButtons name="name" :buttons="choices"></RadioButtons>
    <button>Submit</button>
  </div>
</template>

<script lang="ts" setup>
import RadioButtons, { RadioButton } from '@/components/RadioButtons.vue'

defineProps<{
  name: string
  question: string
  choices: RadioButton[]
}>()
</script>
