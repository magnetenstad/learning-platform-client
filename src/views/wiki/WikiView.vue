<template>
  <h1>Wiki</h1>

  <div class="col" style="gap: 1em; position: relative">
    <textarea></textarea>

    <Section
      v-for="section in sections"
      :section="section"
      @delete="removeSection(section)"
    ></Section>

    <button @click="addSection">Add section</button>

    <div v-if="hoverSummaryResponse" class="hover-box">
      <h2>{{ hoverSummaryResponse.title }}</h2>
      <p>{{ hoverSummaryResponse.description }}</p>
      <p>{{ hoverSummaryResponse.extract }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Section from './Section.vue'
import { SectionProps, SummaryResponse } from './types'

const hoverSummaryResponse = ref<SummaryResponse>()

const sections = ref<SectionProps[]>([])

const addSection = () => {
  sections.value.push({
    title: '',
    paragraphs: [],
  })
}

const removeSection = (section: SectionProps) => {
  const index = sections.value.indexOf(section)
  if (index > 0) {
    sections.value.splice(index, 1)
  }
}

// const url = 'https://en.wikipedia.org/api/rest_v1/page'
// let abortController = new AbortController()
// const hoverSearch = async (searchString: string) => {
//   abortController?.abort('')
//   abortController = new AbortController()
//   try {
//     hoverSummaryResponse.value = await (
//       await fetch(`${url}/summary/${searchString.replaceAll(/\W/g, '_')}`, {
//         signal: abortController.signal,
//       })
//     ).json()
//   } catch {}
// }

// const clearHoverSearch = () => {
//   abortController?.abort('')
//   hoverSummaryResponse.value = undefined
// }
</script>

<style scoped>
.hoverable:hover {
  background-color: black;
  color: white;
}

.hover-box {
  /* position: absolute; */
  background-color: lightblue;
  width: 100%;
}
</style>
