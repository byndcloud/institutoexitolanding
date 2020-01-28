<template lang="pug">
  v-container
    v-toolbar(color='#4d57a6' dark='')
      v-toolbar-title Sócios Fundadores
    v-layout.pb-4.mb-4(column='')
      v-list.mb-4(three-line='')
        template(v-for='(member, index) in members')
          v-list-tile(:key="member['.uid']" avatar='')
            v-list-tile-avatar
              img(:src='member.img_url')
            v-list-tile-content
              v-list-tile-title(v-html='member.name')
              v-list-tile-sub-title(v-html='member.role')
            v-list-tile-action
              v-btn(icon='' ripple='' @click='open(member)')
                v-icon(color='grey lighten-1') fas fa-edit
          v-divider(v-if='index + 1 < members.length' :key='index')
      v-dialog(v-model='editDialog')
        v-card
          v-card-title.title
            | Editar sócio fundador
            v-btn(icon='' ripple='' @click='deleteMember(currentMember)')
              v-icon(color='grey lighten-1') fas fa-trash
          v-card-text
            v-form
              v-text-field(v-model='currentMember.name' label='Nome')
              v-text-field(v-model='currentMember.role' label='Cargo')
              v-text-field(v-model='currentMember.order' label='Ordem')
              v-textarea(v-model='currentMember.bio' label='Mini biografia')
              v-btn(raised='' @click='onPickFile' dark='' color='#4d57a6') Upload image
              input(type='file' style='display: none' ref='fileInput' accept='image/*' @change='onFilePicked')
              v-img(:src='imgUrl' width='150')
              v-layout(row='' justify-space-between='')
                v-btn(@click='editDialog = false') Cancelar
                v-btn(@click='updateMember(currentMember)') Salvar
    v-fab-transition
      v-btn(fab='' large='' dark='' bottom='' right='' fixed='' color='#4d57a6' @click='addMemberDialog = true')
        v-icon fas fa-user-plus
    v-dialog(v-model='addMemberDialog')
      v-card
        v-card-title.title Adicionar sócio fundador
        v-card-text
          v-form
            v-text-field(v-model='name' label='Nome' required='')
            v-text-field(v-model='role' label='Cargo' required='')
            v-text-field(v-model='order' label='Ordem' required='')
            v-textarea(v-model='bio' label='Mini biografia')
            |             Imagem:
            v-btn(raised='' @click='onPickFile' dark='' color='#4d57a6') Upload image
            input(type='file' style='display: none' ref='fileInput' accept='image/*' @change='onFilePicked')
            v-img(:src='imgUrl' width='150')
            v-layout(row='' justify-space-between='' mt-4='')
              v-btn(@click='addMemberDialog = false') Cancelar
              v-btn(@click='addMember()') Adicionar
    v-dialog(v-model='loading' hide-overlay='' persistent='' width='300')
      v-card(color='#4d57a6' dark='')
        v-card-text
          | Carregando...
          v-progress-linear.mb-0(indeterminate='' color='white')
    v-snackbar(
      v-model="updateSnackbar"
      :timeout="10000")
      | Sócio fundador editado com sucesso!
      v-btn(color="white" flat icon @click="updateSnackbar = false")
        v-icon fas fa-times
    v-snackbar(
      v-model="addSnackbar"
      :timeout="10000")
      | Sócio fundador adicionado com sucesso!
      v-btn(color="white" flat icon @click="addSnackbar = false")
        v-icon fas fa-times
</template>

<script>
import firebase from '../firebase.js'

export default {
  fiery: true,
  data () {
    return {
      loading: false,
      members: this.$fiery(firebase.firestore.collection('members'), {
        query: q => q.orderBy('order', 'asc')
      }),
      editDialog: false,
      addMemberDialog: false,
      addSnackbar: false,
      updateSnackbar: false,
      currentMember: '',
      // new member atributes:
      name: '',
      role: '',
      order: '',
      image: null,
      bio: '',
      imgUrl: ''
    }
  },
  methods: {
    open (member) {
      this.currentMember = member
      this.editDialog = true
    },
    async updateMember (member) {
      const memberCode = member['.uid'].split('/')[4] // get doc id
      const updatedMember = firebase.firestore.collection('members').doc(memberCode)
      if (this.image) {
        firebase.firebase.storage().ref('members/' + this.image.name).put(this.image).then(async (data) => {
          let url = await data.ref.getDownloadURL()
          await updatedMember.set({ img_url: url }, { merge: true })
        })
      }
      await updatedMember.set({
        name: member.name,
        role: member.role,
        order: parseInt(member.order, 10),
        bio: member.bio
      }, { merge: true })
      this.image = null
      this.imgUrl = ''
      this.editDialog = false
      this.updateSnackbar = true
    },
    deleteMember (member) {
      var memberCode = member['.uid'].split('/')[4] // get doc id
      firebase.firestore.collection('members').doc(memberCode).delete()
      this.editDialog = false
    },
    addMember () {
      let url
      this.loading = true
      firebase.firebase.storage().ref('members/' + this.image.name).put(this.image).then(async (data) => {
        url = await data.ref.getDownloadURL()
        await firebase.firestore.collection('members').add({
          name: this.name,
          role: this.role,
          order: parseInt(this.order, 10),
          bio: this.bio,
          img_url: url
        })
        this.loading = false
      }).catch((_) => {
        this.loading = false
      })

      this.image = null
      this.imgUrl = ''
      this.addMemberDialog = false
      this.addSnackbar = true
      // this.name = ''
      // this.role = ''
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
    }
  }
}
</script>
