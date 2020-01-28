<template lang="pug">
  v-container
    v-toolbar(color='#4d57a6', dark='')
      v-toolbar-title Summit - Palestrantes
    v-layout.pb-4.mb-4(column='')
      v-list.mb-4(three-line='')
        template(v-for='(associate, index) in associates')
          v-list-tile(:key="associate['.uid']", avatar='')
            v-list-tile-avatar
              img(:src='associate.img_url')
            v-list-tile-content
              v-list-tile-title(v-html='associate.name')
              v-list-tile-sub-title(v-html='associate.email')
            v-list-tile-action.pr-2
              v-btn(icon='', ripple='', @click='open(associate)')
                v-icon(color='grey lighten-1') fas fa-edit
          v-divider(v-if='index + 1 < associates.length', :key='index')
    v-fab-transition
      v-btn(fab='', large='', dark='', bottom='', right='', fixed='', color='#4d57a6', @click='addAssociateDialog = true')
        v-icon fas fa-user-plus
    v-dialog(v-model='addAssociateDialog' max-width="500")
      v-card
        v-card-title.title Adicionar Palestrante
        v-card-text
          v-form
            v-text-field(v-model='name', label='Nome', required='')
            v-textarea(v-model='bio' label='Mini biografia' required)
            | Imagem:
            v-btn(raised='', @click='onPickFile', dark='', color='#4d57a6') Upload image
            input(type='file', style='display: none', ref='fileInput', accept='image/*', @change='onFilePicked')
            v-img(:src='imgUrl', width='150')
            v-layout(row='', justify-space-between='', mt-4='')
              v-btn(@click='addAssociateDialog = false') Cancelar
              v-btn(@click='addAssociate()') Adicionar
    v-dialog(v-model='editDialog')
      v-card
        v-card-title.title
          | Editar membro
          v-btn(icon='', ripple='', @click='deleteAssociate(currentAssociate)')
            v-icon(color='grey lighten-1') fas fa-trash
        v-card-text
          v-form
            v-text-field(v-model='currentAssociate.name', label='Nome')
            v-textarea(v-model='currentAssociate.bio' label='Mini biografia')
            v-btn(raised='' @click='onPickFile' dark='' color='#4d57a6') Upload image
            input(type='file' style='display: none' ref='fileInput' accept='image/*' @change='onFilePicked')
            v-img(:src='imgUrl' width='150')
            v-layout(row='', justify-space-between='')
              v-btn(@click='editDialog = false') Cancelar
              v-btn(@click='editAssociate(currentAssociate)') Salvar
    v-dialog(v-model='loading', hide-overlay='', persistent='', width='300')
      v-card(color='#4d57a6', dark='')
        v-card-text
          | {{loadingText}}
          v-progress-linear.mb-0(indeterminate='', color='white')
    v-snackbar(
      v-model="snackbar"
      :timeout="10000")
      | Conta ainda não validada.
      v-btn(color="white" flat icon @click="snackbar = false")
        v-icon fas fa-times
    v-snackbar(
      v-model="updateSnackbar"
      :timeout="10000")
      | Palestrante editado com sucesso!
      v-btn(color="white" flat icon @click="updateSnackbar = false")
        v-icon fas fa-times
    v-snackbar(
      v-model="addSnackbar"
      :timeout="10000")
      | Palestrante adicionado com sucesso!
      v-btn(color="white" flat icon @click="addSnackbar = false")
        v-icon fas fa-times
</template>
<script>
import firebase from '../firebase.js'
// import pagarme from 'pagarme/browser'

export default {
  fiery: true,
  data () {
    return {
      loading: false,
      associates: this.$fiery(firebase.firestore.collection('summit_members'), {
        key: 'id',
        query: q => q.orderBy('name', 'asc')
      }),
      editDialog: false,
      addAssociateDialog: false,
      currentAssociate: '',
      snackbar: false,
      addSnackbar: false,
      updateSnackbar: false,
      loadingText: 'Carregando...',
      associateTypes: [
        {
          displayName: 'Sócio honorário',
          fbName: 'SOCIO HONORARIO'
        },
        {
          displayName: 'Sócio conselheiro',
          fbName: 'SOCIO CONSULTIVO'
        },
        {
          displayName: 'Sócio estatutário',
          fbName: 'SOCIO ESTATUTARIO'
        }
      ],
      // new associate atributes:
      name: '',
      bio: '',
      image: null,
      imgUrl: ''
    }
  },
  methods: {
    open (associate) {
      this.currentAssociate = associate
      this.editDialog = true
    },
    async addAssociate () {
      let url
      this.loading = true
      if (this.image) {
        firebase.firebase.storage().ref('associates/' + this.image.name).put(this.image).then(async (data) => {
          url = await data.ref.getDownloadURL()
          await firebase.firestore.collection('summit_members').add({
            name: this.name,
            bio: this.bio,
            img_url: url
          })
          this.loading = false
        }).catch((_) => {
          this.loading = false
        })
      } else {
        await firebase.firestore.collection('summit_members').add({
          name: this.name,
          bio: this.bio,
          img_url: url
        })
        this.loading = false
      }

      this.addAssociateDialog = false
      this.image = null
      this.imgUrl = ''
      this.addSnackbar = true
      // this.name = ''
      // this.email = ''
    },
    async editAssociate (associate) {
      const associateCode = associate['.uid'].split('/')[4] // get doc id
      const updatedAssociate = firebase.firestore.collection('summit_members').doc(associateCode)
      if (this.image) {
        firebase.firebase.storage().ref('summit_members/' + this.image.name).put(this.image).then(async (data) => {
          let url = await data.ref.getDownloadURL()
          await updatedAssociate.set({ img_url: url }, { merge: true })
        })
      }
      await updatedAssociate.set({
        name: associate.name,
        bio: associate.bio
      }, { merge: true })
      this.image = null
      this.imgUrl = ''
      this.editDialog = false
      this.updateSnackbar = true
    },
    deleteAssociate (associate) {
      var associateCode = associate['.uid'].split('/')[4] // get doc id
      firebase.firestore.collection('summit_members').doc(associateCode).delete()
      this.editDialog = false
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
        this.imgUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    async charge (associate) {
      // let result = await pagarme.client.connect({
      //   api_key: 'ak_test_5nGgxdwN9w3FKnPhoTaaLIdoGH18cd' // tesing api
      // })
      //   .then(client => client.transactions.create({
      //     amount: 100, // in cents
      //     payment_method: 'boleto',
      //     customer: {
      //       external_id: associate.id,
      //       type: 'individual',
      //       country: 'br',
      //       email: associate.email,
      //       name: associate.name,
      //       documents: [
      //         {
      //           type: 'cpf',
      //           number: associate.cpf // must have
      //         }
      //       ]
      //     }
      //   })).catch(e => {
      //     console.log('error', JSON.stringify(e, null, 2))
      //   })
      // console.log('result charge', result)
      this.loading = true
      this.loadingText = 'Gerando boleto...'
      let self = this
      setTimeout(() => {
        self.snackbar = true
        self.loading = false
        self.loadingText = 'Carregando...'
      }, 4000)
    }
  }
}
</script>
