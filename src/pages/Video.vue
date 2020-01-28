<template>
  <v-container grid-list-xl>
    <v-layout column wrap>
      <span class="headline">Configurar Video</span>
      <v-flex xs12>
        <span class="grey--text">O texto em negrito é o id: </span>
        <br>
        <span>https://www.youtube.com/watch?v=<b>JOIZustr9Xs</b></span>
      </v-flex>
      <v-flex xs12>
        <v-layout>
          <!-- codigo feio de victor -->
          <v-flex>
            <v-text-field
              v-model="url"
              name="video"
              label="ID do Video"
              id="video"
              @submit="updateUrl()"
              :disabled="loading"
            ></v-text-field>
          </v-flex>
          <v-flex shrink>
            <v-switch :disabled="loading" color="red" label="Ao Vivo?" v-model="ready"></v-switch>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 align-content-end>
        <v-layout justify-end row wrap>
          <v-btn right color="success" @click="updateUrl()" :disabled="loading" :loading="loading">Salvar</v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import fb from '../firebase'
const fs = fb.firestore

export default {
  data () {
    return {
      url: '',
      ready: false,
      loading: true
    }
  },
  methods: {
    async updateUrl () {
      this.loading = true
      let data = {
        url: this.url,
        ready: this.ready
      }
      // console.log('dt', data)
      await fs.collection('video').doc('streaming').set(data)
      this.loading = false
    }
  },

  async created () {
    this.loading = true
    let data = await fs.collection('video').doc('streaming').get().then(data => data.data())
    this.url = data.url
    this.ready = data.ready
    this.loading = false
  }
}
</script>

<style>

</style>
