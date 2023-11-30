<template>
  <div class="row" style="gap: 1em">
    <h4>Section</h4>
    <input
      type="text"
      style="flex: 1"
      v-model="section.title"
      @change="textSearch(section.title)"
    />
    <button @click="emit('delete')">X</button>
  </div>

  <div v-if="textSearchResponse && !section.paragraphs.length">
    <ul style="margin: 0">
      <li
        v-for="r in textSearchResponse.query.search"
        class="clickable hover-invert"
        @click="addParagraph(r.title)"
      >
        <b>{{ r.title }}</b> <span v-html="r.snippet"></span>
      </li>
    </ul>
  </div>

  <div v-for="paragraph in section.paragraphs">
    <b>{{ paragraph.title }}</b>
    <div v-if="paragraph.summary">
      <p>{{ paragraph.summary.description }}</p>
      <p>{{ paragraph.summary.extract }}</p>
    </div>
  </div>

  <hr />
</template>

<script lang="ts" setup>
import { api } from '@/router'
import { ref } from 'vue'
import { Paragraph, SectionProps, SearchResponse } from './types'

const props = defineProps<{ section: SectionProps }>()

const emit = defineEmits<{
  delete: []
}>()

const textSearchResponse = ref<SearchResponse>()

const textSearch = async (searchString: string) => {
  textSearchResponse.value = undefined
  textSearchResponse.value = await (
    await fetch(`${api}/wiki/${searchString}`)
  ).json()
}

const addParagraph = async (title: string) => {
  const url = 'https://en.wikipedia.org/api/rest_v1/page'
  const paragraph: Paragraph = { title }
  paragraph.summary = await (
    await fetch(`${url}/summary/${paragraph.title}`)
  ).json()
  props.section.paragraphs.push(paragraph)
}
</script>

<style scoped>
.hover-invert:hover {
  background-color: black;
  color: white;
}
</style>
