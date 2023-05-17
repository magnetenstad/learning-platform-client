<template>
  <div v-for="button in buttons">
    <input type="radio" :id="button.id" :name="name" :value="button.value" />
    <label :for="button.id">{{ button.label }}</label>
  </div>
</template>

<script lang="ts" setup>
export type RadioButton = { id: string; value: string; label: string }
defineProps<{
  name: string
  buttons: RadioButton[]
}>()
</script>
