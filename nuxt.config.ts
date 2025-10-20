// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    plugins: ["~/server/api/index.ts"],
  },

  runtimeConfig:{
    mongodbURI: process.env.MONGODB_URI,
    authSecret: process.env.AUTH_SECRET,
  },
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss", 
    "@sidebase/nuxt-auth", 
    "@pinia/nuxt"
  ],

  auth: {
    baseURL: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  }
})