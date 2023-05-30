<template>
  <div v-for="button in buttons">
    <input
      type="radio"
      :id="getId(button)"
      :name="name"
      :value="button.value"
      @input="emit('input', $event)"
    />
    <label :for="getId(button)">{{ button.label ?? button.value }}</label>
  </div>
</template>

<script lang="ts" setup>
export type RadioButton = { id?: string; value: string; label?: string }

const props = defineProps<{
  name: string
  buttons: RadioButton[]
}>()

const emit = defineEmits<{ input: [event: Event] }>()

const getId = (btn: RadioButton) => props.name + (btn.id ?? btn.value)
</script>
