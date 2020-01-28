<template>
  <v-container pa-0 ma-0 class="minWidth container">
    <br>
    <br>
    <br>
    <br>

    <div v-if="events.length > 0">
      <v-container class="minWidth" grid-list-md text-xs-center>
        <v-layout row wrap>
          <v-flex
            xs12
            sm12
            md4
            v-for="n in events"
            :key="n['.uid']"
            @click="openDetails(n)"
            style="cursor: pointer"
          >
            <v-card elevation="1" pa-0>
              <v-img :src="((n.images || [0])[0] || {}).path" height="200px"></v-img>

              <v-card-title primary-title class="pl-0">
                <div class="title font-weight-light text-xs-left">{{n.title}}</div>
                <span class="grey--text left">{{momentCalendar(n.date.toLocaleString())}}</span>
              </v-card-title>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </div>

    <div v-if="loadingEvents == true">
     <exito-loading name="Eventos"></exito-loading>
    </div>

    <div v-if="events.length == 0 && loadingEvents == false">
      <v-content>
        <v-container>
          <v-layout wrap row justify-center align-center>
            <v-flex class="text-xs-center">
              <v-icon style="font-size: 150px">layers</v-icon>
              <br>
              <h1
                class="font-weight-thin"
                style="color: rgba(0,0,0,0.54);"
              >Em breve, traremos detalhes sobre os eventos que já realizamos.</h1>
              <br>
              <v-btn
                dark
                color="#f37b50"
                large
                href="/#proximoseventos"
              >Clique aqui e veja os próximos eventos</v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </div>
    <!--Details-->
    <v-layout row justify-center>
      <v-dialog
        v-model="detailsDialog"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
      >
        <v-card>
          <v-toolbar dark color="#5c6bc0">
            <v-btn icon @click="detailsDialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-toolbar-title>{{currentEvent.title}}</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
              <!--<v-btn dark flat @click="detailsDialog = false">Save</v-btn>-->
            </v-toolbar-items>
          </v-toolbar>

          <v-container>
            <v-layout row wrap align-center justify-center>
              <v-flex sm12>
                <v-layout justify-center my-4 v-if="currentEvent.video_url !== undefined">
                  <iframe
                    width="860"
                    height="435"
                    :src="currentEvent.video_url"
                    frameborder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
                  >
                  </iframe>
                </v-layout>
                <v-carousel v-if="images_len > 0">
                  <v-carousel-item
                    v-for="(item,i) in currentEvent.images"
                    :key="i"
                    :src="item.path"
                  ></v-carousel-item>
                </v-carousel>
              </v-flex>
              <v-flex class="text-xs-center pt-4" xs12>
                <span class="font-weight-thin.font-italic display-2">{{currentEvent.title}}</span>
                <br>
                <br>
                <div class="text-xs-left">
                  <span class="font-weight-thin.font-italic title">{{currentEvent.subtitle}}</span>
                </div>
                <br>
                <br>
                <v-content class="text-xs-justify">
                  <div class="body-2" v-html="currentEvent.details"></div>
                </v-content>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-container>
</template>

<script>

import ExitoLoading from '../components/Loading.vue'
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
    ExitoLoading
  },
  data () {
    return {
      loadingEvents: true,
      dialogInscrevase: false,
      events: [],
      currentEvent: {},
      drawer: false,
      showMenu: false,
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
    openDetails (evt) {
      this.currentEvent = evt
      console.log(this.currentEvent.images.length)
      this.images_len = evt.images.length
      this.detailsDialog = !this.detailsDialog
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
    this.$fiery(Firebase.firestore.collection('events'), {
      query: q =>
        q
          .where('visible', '==', true)
          .where('date', '<', todayDate)
          .orderBy('date', 'asc'),
      onSuccess (res) {
        self.loadingEvents = false
        self.events = res
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
