import { supabase } from '@/supabase'
import { acceptHMRUpdate, defineStore } from 'pinia'

const signInRedirectUrl = import.meta.env.DEV
  ? 'http://127.0.0.1:5173/owly/#/'
  : undefined

export const useUserStore = defineStore('user', {
  state: () => ({
    // user: null as OAuthResponse,
  }),

  actions: {
    async signIn() {
      console.log(window.location.origin)
      const oAuth = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: signInRedirectUrl },
      })

      console.log(oAuth)
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
