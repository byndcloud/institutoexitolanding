<template lang="pug">
  v-container
    v-toolbar(color='#4d57a6', dark='')
      v-toolbar-title Associados
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
            v-list-tile-action.pl-2
              v-btn.pa-2(@click="charge(associate)")
                v-icon(dark) attach_money
                | Cobrar
          v-divider(v-if='index + 1 < associates.length', :key='index')
    v-fab-transition
      v-btn(fab='', large='', dark='', bottom='', right='', fixed='', color='#4d57a6', @click='addAssociateDialog = true')
        v-icon fas fa-user-plus
    v-dialog(v-model='addAssociateDialog' max-width="500")
      v-card
        v-card-title.title Adicionar Associado
        v-card-text
          v-form
            v-text-field(v-model='name', label='Nome', required='')
            v-text-field(v-model='email', label='E-mail', required='')
            v-text-field(v-model='cpf' label='CPF')
            v-select(v-model='type' :items="associateTypes" item-value='fbName' item-text='displayName' label='Tipo de sócio' required)
            v-select(v-model='gender' :items="genderOptions" item-value='code' item-text='name' label='Sexo do(a) associado(a)')
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
            v-text-field(v-model='currentAssociate.email', label='E-mail')
            v-text-field(v-model='currentAssociate.cpf' label='CPF')
            v-select(v-model='currentAssociate.func' label='Tipo de sócio' :items="associateTypes" item-value='fbName' item-text='displayName' required)
            v-select(v-model='currentAssociate.gender' :items="genderOptions" item-value='code' item-text='name' label='Sexo do(a) associado(a)')
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
      | Associado editado com sucesso!
      v-btn(color="white" flat icon @click="updateSnackbar = false")
        v-icon fas fa-times
    v-snackbar(
      v-model="addSnackbar"
      :timeout="10000")
      | Associado adicionado com sucesso!
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
      associates: this.$fiery(firebase.firestore.collection('associates'), {
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
      genderOptions: [
        {
          name: 'Masculino',
          code: 'm'
        },
        {
          name: 'Feminino',
          code: 'f'
        }
      ],
      // new associate atributes:
      name: '',
      email: '',
      cpf: '',
      // order: '',
      type: '',
      bio: '',
      gender: '',
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
          await firebase.firestore.collection('associates').add({
            name: this.name,
            email: this.email,
            cpf: this.cpf,
            // order: parseInt(this.order, 10),
            gender: this.gender,
            bio: this.bio,
            func: this.type,
            img_url: url
          })
          this.loading = false
        }).catch((_) => {
          this.loading = false
        })
      } else {
        await firebase.firestore.collection('associates').add({
          name: this.name,
          email: this.email,
          cpf: this.cpf,
          // order: parseInt(this.order, 10),
          gender: this.gender,
          bio: this.bio,
          func: this.type
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
      const updatedAssociate = firebase.firestore.collection('associates').doc(associateCode)
      if (this.image) {
        firebase.firebase.storage().ref('associates/' + this.image.name).put(this.image).then(async (data) => {
          let url = await data.ref.getDownloadURL()
          await updatedAssociate.set({ img_url: url }, { merge: true })
        })
      }
      await updatedAssociate.set({
        name: associate.name,
        email: associate.email,
        cpf: associate.cpf,
        gender: associate.gender,
        bio: associate.bio,
        func: associate.func
      }, { merge: true })
      this.image = null
      this.imgUrl = ''
      this.editDialog = false
      this.updateSnackbar = true
    },
    deleteAssociate (associate) {
      var associateCode = associate['.uid'].split('/')[4] // get doc id
      firebase.firestore.collection('associates').doc(associateCode).delete()
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
