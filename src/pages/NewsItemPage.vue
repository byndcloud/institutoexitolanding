<template lang="pug">
    //- news-card(:showEdit='false' :news.sync='newsItem')
    v-content
      br
      div(v-if='loading == true')
        exito-loading(name='Carregando noticia')
      v-container
        basic-card(:basicObject='newsItem' :hideExpand='true')
</template>

<script>
import Firebase from '../firebase'
import BasicCard from '../components/BasicCard'
export default {
  fiery: true,
  components: {
    BasicCard
  },
  data: () => {
    return {
      loading: true,
      newsItem: {
        date: {
          seconds: ''
        }
      }
    }
  },
  created () {
    const newsId = this.$route.params.id
    this.$fiery(Firebase.firestore.doc(`posts/${newsId}`), {
      query: q => q.where('visible', '==', true),
      onSuccess: (data) => {
        console.log('hmm')
        this.newsItem = data
        this.loading = false
      }
    })
  }
}
</script>
