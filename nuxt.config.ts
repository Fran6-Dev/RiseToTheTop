// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    plugins: ["~/server/api/index.ts"],
  },

  runtimeConfig:{
    mongodbURI: process.env.MONGODB_URI,
  },
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"]
})