<template lang="pug">
  v-card.pa-0
    v-progress-linear(v-if="loading" :active="loading" :indeterminate="true")
    //- v-img.ma-0.pa-0(:src='completeNews.img' aspect-ratio='2.75')
    v-card-title.mx-3.mb-1(primary-title)
      v-layout
        h3.title.mb-0.font-weight-light {{ completeNews.title }}
        v-spacer
        v-icon.primary--text(@click="openUrl()") open_in_new
    v-card-title.my-0.py-0.mx-3(primary-title)
      v-layout
        h6.caption.grey--text Fonte: {{ completeNews.source }}
    //- Without text-truncate I cant keep all cards with the same height,
    //- because the number of lines in the description varies, ideas?
    //- v-card-text.ma-1.justifyText.text-truncate {{ completeNews.description }}
    v-card-text.caption.ma-1 {{ completeNews.description }}
    v-card-actions.px-3.pb-3.pt-0(v-if="showEdit")
      v-btn.pl-2(color="red" outline  @click="$emit('delete')")
        v-icon.mr-1 close
        | Remover
      v-spacer
      v-btn.pl-2(color="primary" @click="$emit('edit')")
        | &nbsp
        v-icon.mr-2 edit
        | Editar

</template>

<script>
import { getPreview } from '../utils'

export default {
  props: {
    news: Object,
    showEdit: Boolean
  },

  data () {
    return {
      loading: true,
      completeNews: {},
      preview: {}
    }
  },

  watch: {
    news (nw, old) {
      this.loadNews(nw)
    }
  },

  methods: {
    openUrl () {
      window.open(this.news.url, '_blank')
    },

    async loadNews (preview) {
      this.loading = true
      this.completeNews = this.news
      if (!preview) {
        this.preview = await getPreview(this.news.url)
        console.log('this.news.url', this.news.url, this.preview)
        let { img, title, description, source } = this.preview
        if (img && !this.news.img) {
          this.completeNews.img = img
        }
        if (title && !this.news.title) {
          this.completeNews.title = title
        }
        if (description && !this.news.description) {
          this.completeNews.description = description
        }
        if (source && !this.news.source) {
          this.completeNews.source = source
        }
      } else {
        this.preview = preview
        this.completeNews = Object.assign(this.completeNews, this.preview)
      }
      this.loading = false
    }
  },

  async created () {
    await this.loadNews()
  }
}
</script>

<style></style>
