import { defineNuxtPlugin } from '#app'
import VueGoogleMaps from '@fawmi/vue-google-maps'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(VueGoogleMaps, {
    load: {
      key: 'AIzaSyD55fZsCrb8UhtCXcZ0unKt-HSXAP_WDPY',
      libraries: 'places'
    }
  })
})
