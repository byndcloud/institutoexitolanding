<template lang="pug">
  v-container
    v-snackbar(v-model='snackbar')
        span Vídeo adicionado!
        v-btn(dark='' flat='' @click='snackbar = false')
            v-icon fas fa-times
    v-snackbar(v-model='snackbarDelete')
        span Vídeo deletado
        v-btn(dark='' flat='' @click='snackbarDelete = false')
            v-icon fas fa-times
    v-snackbar(v-model='snackbarUpdate')
        span Vídeo editado com sucesso!
        v-btn(dark='' flat='' @click='snackbarUpdate = false')
            v-icon fas fa-times
    v-toolbar(color='#4d57a6' dark)
        v-toolbar-title Vídeos inspiracionais
    v-layout.pb-4.mb-4(column)
      v-layout.py-3(v-if='loadingVideos' justify-center)
        v-progress-circular(indeterminate color='primary')
      v-layout.py-4(v-if='!loadingVideos && videos.length === 0' justify-center)
        .headline Não há banners cadastrados.
      v-list.mb-4(three-line)
          template(v-for='(video, index) in videos')
              v-list-tile(:key="video['.uid']")
                  v-list-tile-content
                    v-list-tile-title(v-html='video.member_name')
                    v-list-tile-sub-title(v-html='video.url')
                  v-list-action
                    v-btn(icon ripple @click='open(video)')
                      v-icon(color='grey lighten-1') fas fa-edit
              v-divider(v-if='index + 1 < videos.length' :key='index')
      v-dialog(v-model='editDialog')
        v-card.pa-0
          v-toolbar.headline.pa-0.ma-0.elevation-3
            | Editar vídeo inspiracional
            v-spacer
            v-btn(color='warning' ripple='' @click='deleteVideo(currentVideo)')
                | Remover vídeo
                v-icon(right='') fas fa-trash
            .pt-3
              v-checkbox(color='info' ripple='' v-model='currentVideo.visible' :label='`Vídeo vísivel no site`')
          v-card-text
            v-form
              v-text-field(v-model='currentVideo.url' label='URL do vídeo no YouTube' required)
              v-text-field(v-model='currentVideo.title' label='Título do vídeo' required)
              // v-select(v-model='currentVideo.member.uid' item-value='uid' :items='members' item-text='name' label='Membro' required)
              v-textarea(v-model='currentVideo.description' label='Minibiografia' required)
              // v-checkbox(v-model='currentVideo.visible' label='Vídeo visível')
              v-layout(row='' justify-space-between='' mt-4='')
                  v-btn(@click='editDialog = false' :disabled='loading') Cancelar
                  v-btn(color='info' @click='updateVideo(currentVideo)' :loading='loading')
                      v-icon(left) save
                      | Salvar
    v-fab-transition
    v-btn(fab large dark bottom right fixed color='#4d57a6' @click='addVideoDialog = true')
        v-icon add
    v-dialog(v-model='addVideoDialog' transition='dialog-bottom-transition')
        v-card.pa-0
            v-toolbar
                v-toolbar-title Adicionar vídeo inspiracional
            v-card-text
                v-form
                    v-text-field(v-model='video.url' label='URL do vídeo no YouTube' required)
                    v-text-field(v-model='video.title' label='Título do vídeo' required)
                    v-select(v-model='video.member.uid' item-value='uid' :items='members' item-text='name' label='Membro' required)
                    v-textarea(v-model='video.description' label='Minibiografia' required)
                    v-checkbox(v-model='video.visible' label='Vídeo visível')
                    v-layout(row='' justify-space-between='' mt-4='')
                        v-btn(@click='addVideoDialog = false' :disabled='loading') Cancelar
                        v-btn(color='info' @click='saveVideo()' :loading='loading' )
                            v-icon(left='') save
                            | Salvar
</template>

<script>
import firebase from '../firebase.js'
/* eslint-disable */
export default {
  fiery: true,
  data () {
    return {
      loadingVideos: true,
      videos: this.$fiery(firebase.firestore.collection('inspirational_videos'), {
        query: q => q.where('active', '==', true),
        onSuccess: (videos) => {
          this.loadingVideos = false
        }
      }),
      addVideoDialog: false,
      video: {
        url: '',
        title: '',
        member: {
          uid: '',
          name: ''
        },
        visible: null,
        description: ''
      },
      members: [],
      loading: false,
      snackbar: false,
      snackbarDelete: false,
      snackbarUpdate: false,
      editDialog: false,
      currentVideo: {
        url: '',
        title: '',
        member: {
          uid: '',
          name: ''
        },
        visible: null,
        description: ''
      },
      duplicate: null
    }
  },
  mounted: async function () {
    await firebase.firestore.collection('members').get().then(snapshot => {
      snapshot.forEach(doc => {
        let data = doc.data()
        let member = {}
        member.name = data.name
        member.uid = doc.id
        this.members.push(member)
      })
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    open (video) {
      this.duplicate = video
      this.currentVideo.url = video.url
      this.currentVideo.title = video.title
      // this.currentVideo.member.uid = video.member.uid
      // this.currentVideo.member.name = video.member.name
      this.currentVideo.visible = video.visible
      this.currentVideo.description = video.description
      this.editDialog = true
    },
    async updateVideo (video) {
      this.loading = true
      var videoCode = this.duplicate['.uid'].split('/')[4] // get doc id
      await firebase.firestore.collection('inspirational_videos').doc(videoCode).set({
        url: video.url,
        title: video.title,
        visible: video.visible,
        description: video.description
      }, { merge: true })
      this.loading = false
      this.editDialog = false
      this.snackbarUpdate = true
    },
    async deleteVideo (video) {
      this.loading = true
      var videoCode = this.duplicate['.uid'].split('/')[4] // get doc id
      await firebase.firestore.collection('inspirational_videos').doc(videoCode).set({
        active: false,
        visible: false
      }, { merge: true })
      this.loading = false
      this.editDialog = false
      this.snackbarDelete = true
    },
    async saveVideo () {
      this.loading = true
      let member_selected
      this.members.map((member) => {
        if(member.uid === this.video.member.uid) {
          member_selected = member
        }
      })
      const url = this.video.url.replace('watch?v=', 'embed/')
      await firebase.firestore.collection('inspirational_videos').add({
        url_embed: url,
        url: this.video.url,
        title: this.video.title,
        member_name: member_selected.name,
        member_uid: member_selected.uid,
        description: this.video.description,
        active: true,
        visible: true
      }).then(ref => {
        console.log('Added document with ID: ', ref.id)
        this.loading = false
        this.addVideoDialog = false
        this.snackbar = true
      })
    }
  }
}
</script>

<style>
#center-flex {
    display: flex;
    justify-content: center;
}
</style>
