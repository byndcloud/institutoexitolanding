<template lang="pug">
  v-container#inspiracionais
    div.font-weight-black.display-1(px-4='' py-3='')
      div.my-3(style='font-size: 1.2em; line-height: 35pt;') Vídeos Inspiracionais
    v-layout.minWidth(align-center)
      v-flex(xs12)
        carousel(:centerMode='true' :perPage="perPage" :perPageCustom='perPageCustom' :autoplay='true' :autoplayTimeout='3100' :loop='true' paginationColor='#ffffff' paginationActiveColor='#ffffff')
          slide.pa-2(v-for='video in videos' :key="video['.uid']")
            //- v-img(aspect-ratio='1.5' :src="video.poster" style="height: 300px; width: 100%" @click="openVideo(video)")
            <iframe width="100%" height="300" :src="video.url_embed" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            .headline.font-weight-thin.mt-3.mb-2 {{video.title}}
            // .caption(style='color: black') {{video.description}}
</template>

<script>
import { Carousel, Slide } from 'vue-carousel'
import firebase from '../../firebase.js'

export default {
  components: {
    Carousel,
    Slide
  },
  fiery: true,
  data () {
    return {
      perPage: 1,
      perPageCustom: [
        [2349, 3],
        [1949, 2],
        [1449, 2],
        [1402, 2],
        [786, 2],
        [686, 1],
        [590, 1],
        [512, 1],
        [400, 1],
        [350, 1]
      ],
      videosOld: [
        {
          img_url: '',
          role: 'public'
        }
      ],
      videos: this.$fiery(firebase.firestore.collection('inspirational_videos'), {
        query: q => q.where('active', '==', true).where('visible', '==', true)
      })
      // videos: [
      //   {
      //     name:
      //       'Transformando sonhos em realidade", a trajetória de Janguiê Diniz (completo)',
      //     url: 'https://www.youtube.com/watch?v=DoJnPAhBQuE',
      //     url_embed: 'https://www.youtube.com/embed/DoJnPAhBQuE',
      //     poster: 'https://img.youtube.com/vi/DoJnPAhBQuE/maxresdefault.jpg'
      //   },
      //   {
      //     name: 'The People Accelerator - Sneak Preview by Ricardo Bellino',
      //     url: 'https://www.youtube.com/watch?v=Hz34bp86aHc',
      //     url_embed: 'https://www.youtube.com/embed/Hz34bp86aHc',
      //     poster: 'https://img.youtube.com/vi/Hz34bp86aHc/maxresdefault.jpg'
      //   }
      // ]
    }
  },
  methods: {
    openVideo (video) {
      // console.log(video)
      return video
    }
  }
}
</script>
