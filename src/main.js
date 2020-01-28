/* eslint-disable*/
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/src/stylus/app.styl'
import App from './App.vue'
import router from './router'
// import Firebase from './firebase'
import FieryVue from 'fiery-vue'
import VueLazyload from 'vue-lazyload'
import DatetimePicker from 'vuetify-datetime-picker'
import VueYouTubeEmbed from 'vue-youtube-embed' 
import 'vuetify-datetime-picker/src/stylus/main.styl'
import './main.css'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#4d57a6'
  }
})

Vue.use(DatetimePicker)
Vue.use(VueLazyload)
Vue.use(FieryVue)
Vue.use(VueYouTubeEmbed)

Vue.config.productionTip = false

new Vue({
  router,
  fiery: true,
  render: h => h(App),
  mounted: () => document.dispatchEvent(new Event("x-app-rendered")),
  // created () {
  //   Firebase.app.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       console.log('user signed in.')
  //     } else {
  //       // When user sign out
  //       if (!this.$route.meta.public) {
  //         router.push({ name: 'login' })
  //       }
  //     }
  //   })
  // }
}).$mount('#app')