<template lang="pug">
    v-container
        v-snackbar(v-model='snackbar')
            span Banner adicionado!
            v-btn(dark='' flat='' @click='snackbar = false')
                v-icon fas fa-times
        v-snackbar(v-model='snackbarDelete')
            span Banner deletado
            v-btn(dark='' flat='' @click='snackbarDelete = false')
                v-icon fas fa-times
        v-snackbar(v-model='snackbarUpdate')
            span Banner editado com sucesso!
            v-btn(dark='' flat='' @click='snackbarUpdate = false')
                v-icon fas fa-times
        v-toolbar(color='#4d57a6' dark)
            v-toolbar-title Banners
        v-layout.pb-4.mb-4(column)
            v-layout.py-3(v-if='loadingBanners' justify-center)
                v-progress-circular(indeterminate color='primary')
            v-layout.py-4(v-if='!loadingBanners && banners.length === 0' justify-center)
                .headline Não há banners cadastrados.
            v-list.mb-4(three-line='')
                template(v-for='(banner, index) in banners')
                    v-list-tile(:key="banner['.uid']" avatar='')
                        v-list-tile-content
                            v-list-tile-title {{banner.title_1}}
                            v-list-tile-sub-title {{banner.title_2}}
                        v-list-tile-action
                            v-btn(icon='' ripple='' @click='open(banner)')
                                v-icon(color='grey lighten-1') fas fa-edit
                    v-divider(v-if='index + 1 < banners.length' :key='index')
        v-fab-transition
        v-btn(fab large dark bottom right fixed color='#4d57a6' @click='addBannerDialog = true')
            v-icon add
        v-dialog(v-model='addBannerDialog' transition='dialog-bottom-transition')
            v-card.pa-0
                v-toolbar
                    v-toolbar-title Adicionar banner para página inicial
                v-card-text
                    v-form
                        v-text-field(v-model='banner.title_1' label='Título do banner' hint='Texto que fica em cima no banner na cor roxa')
                        v-text-field(v-model='banner.title_2' label='Subtítulo do banner' hint='Texto abaixo do título na cor branca')
                        v-text-field(v-model='banner.btn_text' label='Texto do botão')
                        v-text-field(v-model='banner.btn_link' label='Link do botão' hint='Link para onde o usuário será redirecionado ao clicar')
                        // v-select(v-model='banner.btn_icon' label='Ícone do botão')
                        v-checkbox(v-model='banner.visible' label='Visibilidade deste banner')
                        // v-btn(raised='' @click='onPickFile' dark='' color='#4d57a6') Upload image
                        // input(type='file' style='display: none' ref='fileInput' accept='image/*' @change='onFilePicked')
                        // v-img(:src='banner.img_url' width='150')
                        v-layout(row='' justify-space-between='' mt-4='')
                            v-btn(@click='addBannerDialog = false' :disabled='loading') Cancelar
                            v-btn(color='info' @click='saveOnFirestore()' :loading='loading' )
                                v-icon(left='') save
                                | Salvar
        v-dialog(v-model='bannerDialog' transition='dialog-bottom-transition')
            v-card.pa-0
                v-toolbar.headline.pa-0.ma-0.elevation-3
                    | Editar banner para página inicial
                    v-spacer
                    v-btn(color='warning' ripple='' @click='deleteBanner()')
                        | Remover banner
                        v-icon(right='') fas fa-trash
                    .pt-3
                        v-checkbox(color='info' ripple='' v-model='currentBanner.visible' :label='`Banner vísivel no site`')
                v-card-text
                    v-form
                        v-text-field(v-model='currentBanner.title_1' label='Título do banner' hint='Texto que fica em cima no banner na cor roxa')
                        v-text-field(v-model='currentBanner.title_2' label='Subtítulo do banner' hint='Texto abaixo do título na cor branca')
                        v-text-field(v-model='currentBanner.btn_text' label='Texto do botão')
                        v-text-field(v-model='currentBanner.btn_link' label='Link do botão' hint='Link para onde o usuário será redirecionado ao clicar')
                        // v-select(v-model='currentBanner.btn_icon' label='Ícone do botão')
                        // v-btn(raised='' @click='onPickFile' dark='' color='#4d57a6') Upload image
                        // input(type='file' style='display: none' ref='fileInput' accept='image/*' @change='onFilePicked')
                        // v-img(:src='currentBanner.img_url' width='150')
                        v-layout(row='' justify-space-between='' mt-4='')
                            v-btn(@click='bannerDialog = false' :disabled='loading') Cancelar
                            v-btn(color='info' @click='updateBanner()' :loading='loading' )
                                v-icon(left='') save
                                | Salvar
</template>

<script>
import firebase from '../firebase.js'

export default {
  fiery: true,
  data () {
    return {
      loading: false,
      loadingBanners: true,
      addBannerDialog: false,
      bannerDialog: false,
      banners: this.$fiery(firebase.firestore.collection('banners'), {
        query: q => q.where('active', '==', true),
        onSuccess: (banners) => {
          this.loadingBanners = false
        }
      }),
      banner: {
        title_1: '',
        title_2: '',
        btn_text: '',
        btn_icon: '',
        btn_link: '',
        visible: null,
        img_url: ''
      },
      currentBanner: {},
      image: null,
      snackbar: false,
      snackbarUpdate: false,
      snackbarDelete: false,
      duplicate: null
    }
  },
  methods: {
    open (banner) {
      this.bannerDialog = true
      this.currentBanner = banner
      this.duplicate = banner
    },
    async deleteBanner () {
      this.loading = true
      var bannerCode = this.duplicate['.uid'].split('/')[4] // get doc id
      await firebase.firestore.collection('banners').doc(bannerCode).set({
        active: false,
        visible: false
      }, { merge: true })
      this.loading = false
      this.bannerDialog = false
      this.snackbarDelete = true
    },
    async updateBanner () {
      this.loading = true
      var bannerCode = this.duplicate['.uid'].split('/')[4] // get doc id
      await firebase.firestore.collection('banners').doc(bannerCode).set({
        title_1: this.currentBanner.title_1,
        title_2: this.currentBanner.title_2,
        btn_text: this.currentBanner.btn_text,
        btn_link: this.currentBanner.btn_link,
        visible: this.currentBanner.visible
      }, { merge: true })
      this.loading = false
      this.bannerDialog = false
      this.snackbarUpdate = true
    },
    async saveBanner () {
      this.loading = true
      console.log(this.banner)
      // a mágica vai acontecer aqui
      let url
      await firebase.firebase.storage().ref('banners/' + this.image.name).put(this.image).then(async (data) => {
        url = await data.ref.getDownloadURL()
        this.saveOnFirestore(url)
      }).catch((_) => {
        this.loading = false
      })
    },
    async saveOnFirestore (url) {
      console.log('salvando no fs')
      this.loading = true
      await firebase.firestore.collection('banners').add({ // nao ta saindo dessa linha
        title_1: this.banner.title_1,
        title_2: this.banner.title_2,
        btn_text: this.banner.btn_text,
        // btn_icon: this.banner.btn_icon,
        btn_link: this.banner.btn_link,
        visible: this.banner.visible,
        // img_url: url,
        active: true
      })
      this.addBannerDialog = false
      this.loading = false
      this.snackbar = true
    },
    onPickFile () {
      this.$refs.fileInput.click()
    },
    onFilePicked (event) {
      const files = event.target.files
      let filename = files[0].name

      if (filename.lastIndexOf('.') <= 0) {
        return alert('Formato de arquivo inválido ')
      }

      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.banner.img_url = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    }
  }
}
</script>
