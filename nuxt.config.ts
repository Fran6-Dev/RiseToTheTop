export default defineNuxtConfig({
  nitro: {
    plugins: ["~/server/api/index.ts"],
  },

  runtimeConfig:{
    mongodbURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/RiseToTheTop',
    authSecret: process.env.AUTH_SECRET,
    cfAccountId: process.env.CF_ACCOUNT_ID,
    r2AccessKeyId: process.env.R2_ACCESS_KEY_ID,
    r2SecretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    r2Bucket: process.env.R2_BUCKET,
    // r2PublicBase : process.env.R2_PUBLIC_BASE || null,

  },
  
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss", 
    "@sidebase/nuxt-auth", 
    "@pinia/nuxt"
  ],

  auth: {
    baseURL: process.env.AUTH_ORIGIN || process.env.NUXT_AUTH_ORIGIN || 'http://localhost:3000',
    provider: {
      type: 'authjs'
    }
  }
})


