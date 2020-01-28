<template lang='pug'>
  v-container.mb-4(grid-list-xl fluid)
    v-toolbar(color='#4d57a6', dark)
      v-toolbar-title Releases

    v-card.mb-4(style='border-top-left-radius: 0px; border-top-right-radius: 0px;')
      v-container.pb-4(fluid)
        v-layout(row wrap)
          v-flex(v-for='(item, index) in posts' xs12 sm6 :key="index")
            PostsCard(:showEdit='true', :basicObject.sync='item', @edit='editPosts(item)' @delete='deletePosts(item)')

    v-dialog(v-model='editDialog', min-width='600px')
      v-card
        v-card-title
          span.headline {{ dialogTitle }}
        v-card-text.pa-0
          v-container(grid-list-sm)
            v-layout(row wrap)
              v-flex(xs12)
                v-text-field(v-model='editedItem.title' label='Título' prepend-icon='title')
              v-menu(v-model="menu" :close-on-content-click='false' :nudge-right='120', lazy, transition='scale-transition', offset-y, full-width, min-width='290px')
                template(v-slot:activator='{ on }')
                  v-text-field(v-model='editedItem.date' label='Data' prepend-icon='event' v-on='on')
                v-date-picker.pa-0.ma-0(v-model='editedItem.date', @input='menu = false')
              v-flex(xs12)
                //- v-textarea(v-model='editedItem.description' prepend-icon='notes' label='Descrição')
                <quill-editor v-model="editedItem.description" ref="myQuillEditor">
                </quill-editor>

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
import PostsCard from '../components/BasicCard'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  fiery: true,
  components: {
    PostsCard: PostsCard,
    quillEditor
  },
  data () {
    return {
      posts: [],
      loading: true,
      loadingPreview: false,
      editDialog: false,
      defaultItem: {
        title: '',
        description: '',
        date: new Date().toISOString().substring(0, 10)
      },
      editedItem: {},
      postsRefs: {},
      originalPosts: {},
      editedIndex: -1,
      actualPosts: null,
      menu: ''
    }
  },

  computed: {
    dialogTitle () {
      return this.editedIndex === -1 ? 'Adicinar Novo Release' : 'Editar Release'
    }
  },

  methods: {
    open (posts) {
      this.title = posts.title
      this.description = posts.description
      this.actualPosts = posts
      this.editDialog = true
    },

    close () {
      this.editDialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    editPosts (posts) {
      this.editedIndex = this.posts.indexOf(posts)
      this.editedItem = Object.assign({}, posts)
      this.originalPosts = posts
      if (posts.date.seconds) {
        this.editedItem.date = new Date(posts.date.seconds * 1000)
      }
      this.editedItem.date = this.editedItem.date.toISOString().substring(0, 10)
      this.editDialog = true
    },

    deletePosts (posts) {
      confirm('Realmente deseja remover essa publicação?') && this.$fiery.remove(posts)
      this.close()
    },

    save () {
      this.posts[this.editedIndex] = { ...this.editedItem }
      let item = this.posts[this.editedIndex]
      item.date = new Date(item.date)
      item.visible = true
      if (item['.uid']) {
        this.$fiery.update(item)
      } else {
        this.$fiery.create(this.posts, item)
      }
      this.posts[this.editedIndex] = { ...item }
      this.close()
    }
  },

  created () {
    this.editedItem = this.defaultItem
    this.$fiery(firebase.firestore.collection('posts'), {
      onSuccess: (data) => {
        this.posts = data
        this.loading = false
      },
      query: q => q.orderBy('date', 'desc')
    })
  }
}
</script>
