<template>
  <div class="col" style="gap: 1em">
    <div
      v-for="button in buttons"
      class="row"
      :style="{ color: button.value == value ? color : undefined }"
    >
      <input
        type="radio"
        :id="getId(button)"
        :name="name"
        :value="button.value"
        @input="select(button)"
      />
      <label
        :for="getId(button)"
        style="margin-left: 0.5em; display: inline-block"
        >{{ button.label ?? button.value }}</label
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
export type RadioButton = { value: string; id?: string; label?: string }

const props = defineProps<{
  name: string
  buttons: RadioButton[]
  color?: string
}>()

const emit = defineEmits<{ input: [button: RadioButton] }>()

const value = ref('')

const getId = (btn: RadioButton) => props.name + (btn.id ?? btn.value)

const select = (button: RadioButton) => {
  value.value = button.value
  emit('input', button)
}
</script>
