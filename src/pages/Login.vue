<template>
    <v-container pa-0 class="main">
        <v-layout fill-height column justify-center align-center>
            <v-dialog v-model="register" width="60vw">
                <v-card>
                    <v-card-title class="title">Registrar</v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field
                            label="Nome"
                            v-model="user.name"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                            label="E-mail"
                            v-model="user.mail"
                            required
                            >
                            </v-text-field>
                            <v-text-field
                                v-model="user.password"
                                :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                                :rules="[rules.required, rules.min]"
                                :type="show ? 'text' : 'password'"
                                name="input-10-1"
                                label="Senha"
                                hint="At least 8 characters"
                                counter
                                @click:append="show = !show"
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-layout row justify-space-between>
                        <v-btn flat @click="register = false">Voltar</v-btn>
                        <v-btn flat @click="check(user.mail)">Cadastrar</v-btn>
                    </v-layout>
                </v-card>
            </v-dialog>
            <v-card class="formLoginCard">
                <v-card-title class="title">Entrar</v-card-title>
                <v-card-text>
                    <v-form>
                        <v-text-field
                        label="E-mail"
                        v-model="user.mail"
                        required
                        >
                        </v-text-field>
                        <v-text-field
                            v-model="user.password"
                            :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                            :rules="[rules.required, rules.min]"
                            :type="show ? 'text' : 'password'"
                            name="input-10-1"
                            label="Senha"
                            hint="At least 8 characters"
                            counter
                            @click:append="show = !show"
                            @keyup.enter="login"
                        ></v-text-field>
                        <v-btn flat @click="login">Entrar</v-btn>
                    </v-form>
                </v-card-text>
            </v-card>
            <div class="my-4"><v-btn @click="register=true">Cadastre-se</v-btn></div>
        </v-layout>
        <v-dialog v-model="notAllowed">
            <v-card>
                <v-card-title class="title">Usuário não autorizado!</v-card-title>
                <v-card-text>Entre em contato com os administradores.</v-card-text>
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
      register: false,
      user: {
        name: '',
        mail: '',
        password: ''
      },
      show: false,
      notAllowed: false,
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailMatch: () => ('The email and password you entered don\'t match')
      }
    }
  },
  methods: {
      login () {
        firebase.firebase.auth().signInWithEmailAndPassword(this.user.mail, this.user.password).then(() => {
            this.$router.push('/admin')
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code
            var errorMessage = error.message
        })
      },
      check (userEmail) {
          var user = this.$fiery(firebase.firestore.collection('allowed_users'), {
            query: email => email.where('email', '==', userEmail),
            onSuccess: (allowed_users) => {
                if (user.length > 0) {
                    // allowed
                    this.signUp ()
                } else {
                    this.register = false
                    this.notAllowed = true
                    this.user.email = ''
                    this.user.password = ''
                    this.user.name = ''
                }
            }
          })
      },
      signUp () {
          firebase.firebase.auth().createUserWithEmailAndPassword(this.user.mail, this.user.password).then(()=>{
              this.$router.push('/admin')
          }).catch(function() {
            // Handle Errors here.
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // ...
        })
      }
  }
}

</script>

<style>
.main {
    min-width: 100%;
    height: 100%;
}

.formLoginCard {
    width: 50vw;
    height: min-content;
}
</style>