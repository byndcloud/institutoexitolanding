<style lang="stylus" scoped>
  .disabled
    color: #4d57a6
    pointer-events: ExitoNavigationDrawer
    font-weight: bold
</style>

<template lang="pug">
  v-content
    v-layout.my-3(fill-height justify-center v-if='loading')
        v-progress-linear(v-if="loading" :active="loading" :indeterminate="true")
    v-spacer
    v-container(v-if='!loading')
      v-breadcrumbs.mt-3.px-0.pt-3.pb-0(:items='items')
        template(v-slot:item='props')
            a(:href='props.item.href' :class="[props.item.disabled && 'disabled']" style='text-decoration: none;') {{ props.item.text}}
      v-card.elevation-0.pa-0.mt-1
        h2.headline.mb-0.font-weight-light.mt-4 {{post.title}}
        .caption.grey--text.my-3 Publicado em 17 de Julho por Mirella Ribeiro
        v-card-text.pa-0(v-html="post.description")
</template>

<script>
/* eslint-disable */
import ReleaseCard from "../components/BasicCard.vue"
import firebase from "../firebase.js"
import ExitoLoading from '../components/Loading.vue'
import ExitoToolbar from '../components/landing/Toolbar.vue'
import ExitoNavigationDrawer from '../components/landing/Drawer.vue'

export default {
  fiery: true,
  components: {
    'release-card': ReleaseCard,
    'exito-navigation-drawer': ExitoNavigationDrawer,
    'exito-toolbar': ExitoToolbar
  },
  data () {
    return {
      post: this.$fiery(firebase.firestore.collection('posts').doc('1lp9FyMODHdb0YOL4zUk'), {
          onSuccess: (post) => {
              this.loading = false
          }
      }),
      loading: true,
      drawer: false,
      items: [
          {
              text: 'Notícias',
              disabled: false,
              href: '/news'
          },
          {
              text: 'Conteúdo',
              disabled: true,
              href: '#'
          }
      ]
    }
  },
  methods: {
    onUpdateNavigationDrawer (newValue) {
      console.log('come from event to update drawer... ' + newValue)
      this.drawer = newValue
    }
  }
}
</script>