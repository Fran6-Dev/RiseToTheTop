import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({ id: null as string | null }),
  actions: { setUserId(id: string | null) { this.id = id } },
//  persist: true // si tu utilises @pinia-plugin-persistedstate
})
