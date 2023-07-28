<template>
  <button @click="userStore.signIn">Sign In</button>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
</script>
