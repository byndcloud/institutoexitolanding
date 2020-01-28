<template>
    <v-container>
        <v-toolbar color="#4d57a6" dark>
            <v-toolbar-title>Conteúdo inicial</v-toolbar-title>
        </v-toolbar>
        <v-layout column>
            <v-card class="my-2">
                <v-card-title class="title">
                    <div>Sobre nós</div>
                    <v-btn icon @click="aboutUsDialog = true"><v-icon>fas fa-edit</v-icon></v-btn>
                </v-card-title>
                <v-card-text>{{content.about_us}}</v-card-text>
            </v-card>
        </v-layout>
        <v-dialog v-model="aboutUsDialog">
            <v-card>
                <v-card-title class="title">Editar Quem Somos</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-textarea v-model="newAboutUs" label="Novo texto"></v-textarea>
                        <v-layout row justify-space-between>
                            <v-btn @click="aboutUsDialog = false">Cancelar</v-btn>
                            <v-btn @click="updateAboutUs">Salvar</v-btn>
                        </v-layout>
                    </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
/* eslint-disable */
import firebase from '../firebase.js'

export default {
    fiery: true,
    data () {
        return {
            content: this.$fiery(firebase.firestore.collection('content').doc('banner')),
            aboutUsDialog: false,
            newAboutUs: ''

        }
    },
    methods: {
        updateAboutUs () {
            firebase.firestore.collection('content').doc('banner').update({ about_us: this.newAboutUs })
            this.aboutUsDialog = false
        }
    }
}

</script>

<style>
.navbar {
  position: fixed;
  z-index: 1;
}
</style>