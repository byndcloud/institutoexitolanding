<template lang="pug">
  v-card.pa-0
    v-progress-linear(v-if="loading" :active="loading" :indeterminate="true")
    v-img.ma-0.pa-0(v-if="basicObject.img" :src='basicObject.img' aspect-ratio='2.75')
    v-card-title.mx-3.mb-1(primary-title)
      v-layout(row wrap )
        v-flex(xs12)
          h3.headline.mb-0.font-weight-light(style="cursor: pointer" @click="openNewsItemPage") {{ basicObject.title }}
        v-flex(xs12)
          .caption.grey--text Publicado por Mirella Ribeiro em {{moment.unix(basicObject.date.seconds).format('LLL')}}
          // .caption.grey--text Publicado por Mirella Ribeiro em {{basicObject.date}}
        v-flex(v-if='!hideExpand && expanded' mt-0 pt-0 xs12)
          v-btn(flat small @click="expanded = false")
            | Reduzir texto
            v-icon(large right) expand_less

    v-card-text#completeText.ma-1(v-html="basicObject.description" v-show="expanded || hideExpand")
    v-card-text.ma-1(v-show="!expanded && !hideExpand") {{previewText}}
    v-card-text.ma-1(v-if='!hideExpand')
      v-btn(flat @click="expanded = !expanded")
        v-icon(large left) {{ expanded ? 'expand_less' : 'expand_more' }}
        | Ver {{ expanded ? 'menos' : 'mais' }}
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
import moment from 'moment'

export default {
  props: {
    basicObject: Object,
    showEdit: Boolean,
    hideExpand: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      expanded: false,
      loading: false,
      previewText: '',
      moment: moment
    }
  },
  methods: {
    openNewsItemPage () {
      console.log(`/noticias/${this.basicObject['.uid'].split('/')[4]}`)
      this.$router.push(`/noticias/${this.basicObject['.uid'].split('/')[4]}`)
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.basicObject.date.seconds)
    // console.log(document)
    // console.log(this.$el.querySelector('#completeText'))
    if (this.$el.querySelector('#completeText')) {
      this.previewText = `${this.$el.querySelector('#completeText').textContent.slice(0, 300)}...`
    } else {
      this.previewText = ``
    }
  }
}
</script>

<style>
</style>
