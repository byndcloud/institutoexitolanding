<template lang="pug">
  v-container.mb-4(grid-list-xl fluid)
    v-toolbar(color='#4d57a6', dark)
      v-toolbar-title Saiu na Imprensa

    v-card.mb-4(style='border-top-left-radius: 0px; border-top-right-radius: 0px;')
      v-container.pb-4(fluid)
        v-layout(row wrap)
          v-flex(v-for='(item, index) in news' xs12 sm6 :key="index")
            NewsCard(:showEdit='true', :news.sync='item', @edit='editNews(item)' @delete='deleteNews(item)')

    v-dialog(v-model='editDialog', max-width='500px')
      v-card
        v-card-title
          span.headline {{ dialogTitle }}
        v-card-text.pa-0
          v-container(grid-list-sm)
            v-layout(row wrap)
              v-flex(xs12)
                v-layout(row)
                  v-text-field(v-model='editedItem.url' label='Link' prepend-icon='link')
                  v-btn(:loading="loadingPreview" color='primary' @click="loadPreview(editedItem.url)")
                    v-icon.mr-2 sync
                    | Carregar
              v-flex(xs12)
                v-text-field(v-model='editedItem.title' label='Título' prepend-icon='title')
              v-flex(xs12)
                v-textarea(v-model='editedItem.description' prepend-icon='notes' label='Descrição')
              v-menu(v-model="menu" :close-on-content-click='false' :nudge-right='120', lazy, transition='scale-transition', offset-y, full-width, min-width='290px')
                template(v-slot:activator='{ on }')
                  v-text-field(v-model='editedItem.date' label='Data' prepend-icon='event' v-on='on')
                v-date-picker.pa-0.ma-0(v-model='editedItem.date', @input='menu = false')

        v-card-actions
          v-spacer
          v-btn(color='blue darken-1', flat @click='close') Cancelar
          v-btn(color='blue darken-1', flat @click='save') Salvar

    v-dialog(v-model='loading', hide-overlay persistent width='300')
      v-card(color='#4d57a6', dark)
        v-card-text
          | Carregando...
          v-progress-linear.mb-0(indeterminate color='white')

    v-fab-transition
      v-btn.mr-3(fab dark bottom right fixed color='primary', @click='editDialog = true')
        v-icon fas fa-plus

</template>

<script>
import firebase from '../firebase.js'
import NewsCard from '../components/NewsCard'
import { getPreview } from '../utils'

export default {
  fiery: true,
  components: {
    NewsCard: NewsCard
  },
  data () {
    return {
      news: [],
      loading: true,
      loadingPreview: false,
      editDialog: false,
      defaultItem: {
        title: '',
        description: '',
        url: '',
        date: new Date().toISOString().substring(0, 10)
      },
      editedItem: {},
      newsRefs: {},
      originalNews: {},
      editedIndex: -1,
      actualNews: null,
      menu: ''
    }
  },

  computed: {
    dialogTitle () {
      return this.editedIndex === -1 ? 'Adicinar Nova Release' : 'Editar Release'
    }
  },

  methods: {
    open (news) {
      this.title = news.title
      this.description = news.description
      this.url = news.url
      this.actualNews = news
      this.editDialog = true
    },

    async loadPreview (url) {
      this.loadingPreview = true
      let preview = await getPreview(url)
      this.editedItem = { ...this.editedItem, ...preview }
      this.loadingPreview = false
    },

    close () {
      this.editDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    editNews (news) {
      this.editedIndex = this.news.indexOf(news)
      this.editedItem = Object.assign({}, news)
      this.originalNews = news
      if (news.date.seconds) {
        this.editedItem.date = new Date(news.date.seconds * 1000)
      }
      this.editedItem.date = this.editedItem.date.toISOString().substring(0, 10)
      this.editDialog = true
    },

    deleteNews (news) {
      confirm('Realmente deseja remover essa release?') && this.$fiery.remove(news)
      this.close()
    },

    save () {
      this.news[this.editedIndex] = { ...this.editedItem }
      let item = this.news[this.editedIndex]
      item.date = new Date(item.date)
      item.visible = true
      if (item['.uid']) {
        this.$fiery.update(item)
      } else {
        this.$fiery.create(this.news, item)
      }
      this.news[this.editedIndex] = { ...item }
      this.close()
    }
  },

  created () {
    this.editedItem = this.defaultItem
    this.$fiery(firebase.firestore.collection('news'), {
      onSuccess: (data) => {
        this.news = data
        this.loading = false
      },
      query: q => q.orderBy('date', 'desc')
    })
  }
}
</script>
