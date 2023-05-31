import { acceptHMRUpdate, defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    loading: false,
    loadingText: 'Loading..',
  }),

  actions: {
    startLoading(text: string) {
      this.loadingText = text
      this.loading = true
    },
    stopLoading() {
      this.loading = false
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useGlobalStore, import.meta.hot))
}
