import { supabase } from '@/supabase'
import { User } from '@supabase/supabase-js'
import { acceptHMRUpdate, defineStore } from 'pinia'

const signInRedirectUrl = import.meta.env.DEV
  ? 'http://127.0.0.1:5173/owly/#/'
  : 'https://magne.dev/owly/#/'

supabase.auth.onAuthStateChange((_event, session) => {
  console.log(_event)
  console.log(session)
})

export const useUserStore = defineStore('user', {
  state: () => ({
    user: undefined as User | undefined,
  }),

  actions: {
    async getUser() {
      const response = await supabase.auth.getSession()
      console.log(response)
      this.user = response.data.session?.user
    },
    async signIn() {
      await this.getUser()
      if (this.user) return
      const res = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: { redirectTo: signInRedirectUrl },
      })
      console.log(res.data)
    },
  },
})

useUserStore().getUser()

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
