/* // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true }
}) */

// file: nuxt.config.ts
export default defineNuxtConfig({
  // เพิ่ม Modules ที่ติดตั้งไปแล้วทั้งสองตัว
  modules: [
    '@nuxtjs/tailwindcss', 
    '@pinia/nuxt'
  ],

  // ... (ส่วนอื่นๆ)
})