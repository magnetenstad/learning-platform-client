import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'

const signInRedirectUrl = import.meta.env.DEV
  ? 'http://127.0.0.1:5173/#/'
  : 'https://utdyp.com/#/'

supabase.auth.onAuthStateChange(() => {
  useUserStore().getUser()
})

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
  }),

  actions: {
    async getUser() {
      const response = await supabase.auth.getSession()
      this.user = response.data.session?.user
    },
    async signIn() {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: signInRedirectUrl },
      })
    },
    async signOut() {
      await supabase.auth.signOut()
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
