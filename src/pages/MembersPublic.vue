<template lang="pug">
  v-content
    br
    v-tabs.py-2(color='#4d57a6' v-if='!loadingMembers' centered='' dark='' slider-color='#f37b50')
      v-tab(key='members' ripple='') Sócios Fundadores
      v-tab(key='conselheiros' ripple='') Sócios Conselheiros
      v-tab(key='estatutarios' ripple='') Sócios Estatutários
      v-tab(key='honorarios' ripple='') Sócios Honorários
      v-tab-item(key='members')
        MembersList(:members='members')
        // div(v-if='members.length > 0')
        //   v-container.minWidth.margin(grid-list-md='')
        //     v-layout(row='' wrap='')
        //       v-flex(xs4='' sm4='' v-for='n in members' :key="n['.uid']" @click='openDetails(n)' style='cursor: pointer')
        //         v-card(elevation='1' pa-0='')
        //           v-layout
        //             v-flex(xs7='')
        //               v-card-title(primary-title='')
        //                 div
        //                   .title.font-weight-regular.mb-1 {{n.name}}
        //                   .subtitle.font-italic.mb-1 {{n.role}}
        //                   div(v-if='n.bio') {{n.bio}}
        //                   div(v-else) Em breve uma breve biógrafia sobre este membro aqui!
        //             v-flex(xs5='')
        //               v-img(:src='n.img_url' height='155px' contain='')
      v-tab-item(key='conselheiros')
        MembersList(:members='conselheiros')
      v-tab-item(key='estatutarios')
        MembersList(:members='estatutarios')
      v-tab-item(key='honorarios')
        MembersList(:members='honorarios')
    div(v-if='loadingMembers == true')
      exito-loading(name='Membros')
    div(v-if='members.length == 0 && loadingMembers == false')
      v-content
        v-container
          v-layout(wrap row justify-center align-center)
            v-flex.text-xs-center
              v-icon(style='font-size: 150px') layers
              br
              h1.font-weight-thin(style='color: rgba(0,0,0,0.54);') Em breve, traremos detalhes sobre os nossos membros.
              br
</template>
<script>

import ExitoLoading from '../components/Loading.vue'
import MembersList from '../components/MembersList.vue'
import Firebase from '../firebase'
import moment from 'moment'
import 'moment/locale/pt-br'
// import Media from '@dongido/vue-viaudio'
const nd = new Date()
const todayDate = `${nd.getFullYear()}-${('0' + (nd.getMonth() + 1)).slice(
  -2
)}-${('0' + nd.getDate()).slice(-2)}`
console.log(todayDate)

export default {
  fiery: true,
  components: {
    ExitoLoading,
    MembersList
  },
  data () {
    return {
      loadingMembers: true,
      members: [],
      loadingAssociates: true,
      associates: [],
      estatutarios: [],
      honorarios: [],
      conselheiros: [],
      currentEvent: {},
      speechDialog: false,
      detailsDialog: false,
      initContent: this.$fiery(
        Firebase.firestore.collection('content').doc('banner')
      ),
      snackbar: false,
      color: '#4caf50',
      images_len: 0
    }
  },
  filters: {
    longDateFormat (date) {
      return new Date(date).toLocaleDateString()
    }
  },
  methods: {
    momentCalendar (date) {
      // return moment(date).calendar()
      return moment(date).format('LL')
    },
    textTruncate (str) {
      const length = 322
      const ending = '...'

      if (str.length > length) {
        return str.substring(0, length - ending.length) + ending
      } else {
        return str
      }
    },
    imgUrl (url) {
      return `background: url(${url});`
    }
  },
  created () {
    var self = this
    this.$fiery(Firebase.firestore.collection('members'), { // fundadores
      query: q => q.orderBy('order', 'asc'),
      onSuccess (res) {
        self.loadingMembers = false
        self.members = res
      }
    })
    this.$fiery(Firebase.firestore.collection('associates'), { // consultivos
      query: q => q.orderBy('name', 'asc').where('func', '==', 'SOCIO CONSULTIVO'),
      onSuccess (res) {
        self.loadingAssociates = false
        self.conselheiros = res
      }
    })
    this.$fiery(Firebase.firestore.collection('associates'), { // honorários
      query: q => q.orderBy('name', 'asc').where('func', '==', 'SOCIO HONORARIO'),
      onSuccess (res) {
        self.loadingAssociates = false
        self.honorarios = res
      }
    })
    this.$fiery(Firebase.firestore.collection('associates'), { // estatutários
      query: q => q.orderBy('name', 'asc').where('func', '==', 'SOCIO ESTATUTARIO'),
      onSuccess (res) {
        self.loadingAssociates = false
        self.estatutarios = res
      }
    })
    this.$fiery(Firebase.firestore.collection('associates'), {
      query: q => q.orderBy('name', 'asc'),
      onSuccess (res) {
        self.loadingAssociates = false
        self.associates = res
      }
    })
  }
}
</script>

<style scoped>
.margin {
  margin: 1rem;
}
.up-down {
  animation: updown 2s linear infinite;
}

@keyframes updown {
  50% {
    margin-top: 10px
  }
}
</style>
