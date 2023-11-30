<template>
  <h1>Wiki</h1>
  <div class="col" style="gap: 1em; position: relative">
    <input type="text" v-model="searchString" />
    <button @click="textSearch(searchString)">Search</button>

    <div v-if="textSearchResponse">
      <ul>
        <li
          v-for="r in textSearchResponse.query.search"
          @mouseenter="hoverSearch(r.title)"
        >
          {{ r.title }}
        </li>
      </ul>
    </div>

    <div v-if="summaryResponse">
      <h2>{{ summaryResponse.title }}</h2>
      <p>{{ summaryResponse.description }}</p>
      <p @mouseleave="clearHoverSearch">
        <span
          v-for="word in summaryResponse.extract.split(' ')"
          class="hoverable"
          style="display: relative"
          @click="search(word)"
          @mouseenter="hoverSearch(word)"
        >
          {{ word + ' ' }}
        </span>
        <a :href="summaryResponse.content_urls.desktop.page">Source</a>
      </p>
    </div>

    <div v-if="hoverSummaryResponse" class="hover-box">
      <h2>{{ hoverSummaryResponse.title }}</h2>
      <p>{{ hoverSummaryResponse.description }}</p>
      <p>{{ hoverSummaryResponse.extract }}</p>
    </div>

    <div v-if="relatedResponse">
      <h4>Related</h4>
      <ul>
        <li
          v-for="page in relatedResponse.pages.slice(0, 5)"
          class="hoverable"
          @click="search(page.title)"
        >
          {{ page.title.replaceAll('_', ' ') }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { api } from '@/router'
import { ref } from 'vue'

type RelatedResponsePage = {
  title: string
}
type RelatedResponse = {
  pages: RelatedResponsePage[]
}
type SummaryResponse = {
  title: string
  thumbnail: {
    source: string
  }
  description: string
  extract: string
  content_urls: {
    desktop: {
      page: string
    }
  }
}
type SearchResponse = {
  query: {
    search: {
      ns: number
      title: string
      pageid: number
      size: number
      wordcount: number
      snippet: string
      timestamp: Date
    }[]
  }
}

const url = 'https://en.wikipedia.org/api/rest_v1/page'

let abortController = new AbortController()

const searchString = ref('')
const relatedResponse = ref<RelatedResponse>()
const summaryResponse = ref<SummaryResponse>()
const hoverSummaryResponse = ref<SummaryResponse>()
const textSearchResponse = ref<SearchResponse>()

const search = async (searchString: string) => {
  relatedResponse.value = await (
    await fetch(`${url}/related/${searchString.replaceAll(/\W/g, '_')}`)
  ).json()
  summaryResponse.value = await (
    await fetch(`${url}/summary/${searchString.replaceAll(/\W/g, '_')}`)
  ).json()
}

const hoverSearch = async (searchString: string) => {
  abortController?.abort('')
  abortController = new AbortController()
  try {
    hoverSummaryResponse.value = await (
      await fetch(`${url}/summary/${searchString.replaceAll(/\W/g, '_')}`, {
        signal: abortController.signal,
      })
    ).json()
  } catch {}
}

const textSearch = async (searchString: string) => {
  textSearchResponse.value = await (
    await fetch(`${api}/wiki/${searchString}`)
  ).json()
}

const clearHoverSearch = () => {
  abortController?.abort('')
  hoverSummaryResponse.value = undefined
}
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
