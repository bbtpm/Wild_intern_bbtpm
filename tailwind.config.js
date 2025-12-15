// file: tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 🌟 แก้ไขส่วนนี้ให้เป็นแบบนี้
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}