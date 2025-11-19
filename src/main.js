import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import vueVimeoPlayer from 'vue-vimeo-player'
// import VuePictureSwipe from 'vue-picture-swipe'
import SoundCloud from 'vue-soundcloud-player'
import EnlargeableImage from '@diracleo/vue-enlargeable-image'
// import VueSilentbox from 'vue-silentbox'
import VueEasyLightbox from 'vue-easy-lightbox'
import VueGallerySlideshow from 'vue-gallery-slideshow'

Vue.component('enlargeimage', EnlargeableImage)
Vue.component('soundcloud', SoundCloud)
Vue.use(VueEasyLightbox)
// Vue.component('vuesilentbox', VueSilentbox)
// Vue.use(SoundCloud)

Vue.use(vueVimeoPlayer)
Vue.component('vue-gallery-slideshow', VueGallerySlideshow)
Vue.use(VueGallerySlideshow)

Vue.config.productionTip = false

new Vue({
  store,
  // VueMediaEmbed,
  render: h => h(App),
}).$mount('#app')
