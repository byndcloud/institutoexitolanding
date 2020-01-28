<template lang="pug">
  v-content
    br
    div(v-if='loading == true')
      exito-loading(name='Notícias')
    v-container.pa-0.my-1(v-else grid-list-xl)
      v-layout(hidden-md-and-up)
        v-tabs(color='#4d57a6' centered dark slider-color='#f37b50')
          v-tab(key='institucional' ripple)
            | Institucional
          v-tab(key='imprensa' ripple)
            | Imprensa
          v-tab-item(key='institucional')
            v-card(flat)
              v-flex.pa-0.pt-2(v-for='(item, index) in newsInstitutional' xs12 :key='index')
                basic-card(:basicObject.sync='item')
          v-tab-item(key='imprensa')
            v-card(flat)
              v-flex.pa-0.pt-2(v-for='(item, index) in newsPress' xs12 :key='index')
                news-card(:showEdit='false' :news.sync='item')

      v-layout(hidden-sm-and-down row wrap)
        //- Noticias Institucionais
        v-flex(md8).mt-2
          v-toolbar.white--text(flat color="primary" class="lighten-1")
            v-toolbar-title()
            v-icon.mr-3.white--text far fa-clipboard
            span.title.font-weight-light Institucional
          v-flex.pa-0.pt-2(v-for='(item, index) in newsInstitutional' xs12 :key='index')
            basic-card(:basicObject.sync='item')
        //- Noticias da Imprensa
        v-flex(md4).mt-2
          v-toolbar.white--text(flat style="background-color: #f37b50" class="lighten-1")
            v-toolbar-title()
              v-icon.mr-3.white--text far fa-newspaper
              span.title.font-weight-light Saiu na Imprensa
          v-flex.pa-0.pt-2(v-for='(item, index) in newsPress' xs12 :key='index')
            news-card(:showEdit='false' :news.sync='item')
</template>

<script>
import Firebase from '../firebase'
// import Media from '@dongido/vue-viaudio'

// my code
import ExitoLoading from '../components/Loading.vue'
import NewsCard from '../components/NewsCard'
import BasicCard from '../components/BasicCard'

// until here

const nd = new Date()
const todayDate = `${nd.getFullYear()}-${('0' + (nd.getMonth() + 1)).slice(
  -2
)}-${('0' + nd.getDate()).slice(-2)}`
console.log(todayDate)

export default {
  fiery: true,
  // my code
  components: {
    ExitoLoading,
    NewsCard,
    BasicCard
  },
  data () {
    return {
      // my code
      newsPress: [],
      newsInstitutional: [],
      loading: true,
      // until here
      events: [],
      currentEvent: {},
      showMenu: false,
      speechDialog: false,
      detailsDialog: false,
      initContent: this.$fiery(
        Firebase.firestore.collection('content').doc('banner')
      ),
      snackbar: false,
      color: '#4caf50'
    }
  },
  filters: {
    longDateFormat (date) {
      return new Date(date).toLocaleDateString()
    }
  },
  methods: {
    onUpdateNavigationDrawer (newValue) {
      console.log('come from event to update drawer... ' + newValue)
      this.drawer = newValue
    } /*
    async loadPreview (url) {
      this.loadingPreview = true
      let preview = await getPreview(url)
      this.editedItem = { ...this.editedItem, ...preview }
      this.loadingPreview = false
    } */
  },
  created () {
    this.loading = true
    this.$fiery(Firebase.firestore.collection('news'), {
      query: q => q.where('visible', '==', true).orderBy('date', 'desc'),
      onSuccess: (data) => {
        this.newsPress = data
        this.loading = false
      }
    })
    this.$fiery(Firebase.firestore.collection('posts'), {
      query: q => q.where('visible', '==', true).orderBy('date', 'desc'),
      onSuccess: (data) => {
        this.newsInstitutional = data
        this.loading = false
      }
    })
  }
}
</script>

<style scoped>
.up-down {
  animation: updown 2s linear infinite;
}

@keyframes updown {
  50% {
    margin-top: 10px
  }
}
</style>
