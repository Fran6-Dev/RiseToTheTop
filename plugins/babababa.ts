// plugins/pinia.client.ts
import { createPinia } from 'pinia'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  // Si tu utilises pinia-plugin-persistedstate et veux l'activer, fais-le ici :
  // import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
  // pinia.use(piniaPluginPersistedstate)
  nuxtApp.vueApp.use(pinia)
  // expose to nuxtApp for debug
  nuxtApp._piniaInjected = true as any
})
