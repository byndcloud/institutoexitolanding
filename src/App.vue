<template>
  <div>
    <v-app app style="background: white" data-server-rendered="true">
      <template v-if="!$route.meta.public">
          <v-toolbar fixed app color="#fff">
              <v-toolbar-side-icon @click.stop="drawer = !drawer"><v-icon>fas fa-bars</v-icon></v-toolbar-side-icon>
              <v-toolbar-title class="headline text-uppercase">
                  administração
              </v-toolbar-title>
              <v-layout
              align-center
              justify-end
              row
              fill-height
              >
                  <v-btn flat @click="logout">Sair</v-btn>
              </v-layout>
          </v-toolbar>
          <v-navigation-drawer v-model="drawer" floating app>
              <v-list dense>
                  <v-list-tile v-for="item in items" :key="item.title" :href="item.href">
                      <v-list-tile-action>
                          <!-- <v-icon color="#828282">{{item.icon}}</v-icon> -->
                          <v-icon color="black">
                            {{item.icon}}
                          </v-icon>
                          <!-- <i class="material-icons">
                              {{item.icon}}
                          </i> -->
                      </v-list-tile-action>
                      <v-list-tile-content>
                          <v-list-tile-title>{{item.title}}</v-list-tile-title>
                      </v-list-tile-content>
                  </v-list-tile>
              </v-list>
          </v-navigation-drawer>
          <v-content>
            <router-view />
          </v-content>
      </template>
      <template v-else-if="$route.meta.public && !$route.meta.login">
        <v-container pa-0 ma-0 class="minWidth">
          <exito-toolbar :drawer="publicDrawer" @update-navigation-drawer="onUpdateNavigationDrawer"></exito-toolbar>
          <exito-navigation-drawer :drawer="publicDrawer" @update-navigation-drawer="onUpdateNavigationDrawer"></exito-navigation-drawer>
        </v-container>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
        <v-container class="minWidth" pa-0="pa-0" ma-0="ma-0">
          <v-footer height="auto">
            <v-card class="footer text-xs-center minWidth" flat="flat" tile="tile" color="#fff">
              <v-card-text>
                <v-btn class="mx-3" href="https://www.instagram.com/exito.instituto/" target="_blank" icon="icon">
                    <v-icon size="24px">fab fa-instagram</v-icon>
                </v-btn>
                <v-btn class="mx-3" href="https://www.linkedin.com/company/institutoexitodeempreendedorismo/about/" target="_blank" icon="icon">
                    <v-icon size="24px">fab fa-linkedin</v-icon>
                </v-btn>
              </v-card-text>
              <v-card-text class="pt-0">
                <v-layout justify-center="justify-center">
                    <div class="navIcon"></div>
                </v-layout>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-text>&copy;2019 &mdash;<strong>&Ecirc;xito Instituto</strong></v-card-text>
            </v-card>
          </v-footer>
        </v-container>
      </template>
      <template v-else>
        <transition>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </transition>
      </template>
    </v-app>
  </div>
</template>

<script>
/* eslint-disable */
import firebase from './firebase.js'
import ExitoNavigationDrawer from "./components/landing/Drawer.vue"
import ExitoToolbar from "./components/landing/Toolbar.vue"

export default {
  components: {
    'exito-navigation-drawer': ExitoNavigationDrawer,
    'exito-toolbar': ExitoToolbar
  },
  name: 'App',
  data () {
    return {
      dialogInscrevase: false,
      drawer: true,
      publicDrawer: false,
      showMenu: false,
      menu: [
        {
          title: 'Institucional',
          target: '/#sobre'
        },
        {
          title: 'Plataforma de cursos',
          target: '/#educacao'
        },
        /*  {
             title: 'Mídias',
             target: '#'
           }, */
        {
          title: 'Revista Empreenda',
          target:
            'http://linhadiretadigital.com.br/revistaempreenda/#/inicio/321'
        },
        /* {
            title: 'Depoimentos',
            target: '#'
          }, */
        {
          title: 'Sócios',
          target: '/#membros'
        },
        {
          title: 'Desafios',
          target: '#desafios'
        },
        {
          title: 'Eventos',
          target: '/eventos'
        },
        {
          title: 'Contato',
          target: '/#contato'
        },
        {
          title: 'Inscreva-se',
          target: '/#inscreva-se'
        }
      ],
      items: [
        {
          title: 'Home',
          icon: 'dashboard',
          href: '/admin'
        },
        {
          title: 'Sócios Fundadores',
          icon: 'group',
          href: '/admin/membros'
        },
        {
          title: 'Eventos',
          icon: 'calendar_today',
          href: '/admin/events'
        },
        {
          title: 'Saiu na Imprensa',
          icon: 'public',
          href: '/admin/news'
        },
        {
          title: 'Releases',
          icon: 'insert_comment',
          href: '/admin/publicacoes'
        },
        {
          title: 'Vídeos inspiracionais',
          icon: 'videocam',
          href: '/admin/videos-inspiracionais'
        },
        {
          title: 'Banner',
          icon: 'panorama',
          href: '/admin/banners-iniciais'
        },
        {
          title: 'Associados',
          icon: 'fas fa-hand-holding-usd',
          href: '/admin/associates'
        },
        {
          title: 'Summit - Palestrantes',
          icon: 'fas fa-users',
          href: '/admin/summit-participantes'
        }
        // {
        //   title: 'Usuários permitidos',
        //   icon: 'perm_identity',
        //   href: '/'
        // }
      ]
    }
  },
  methods: {
    logout () {
        firebase.firebase.auth().signOut().then(function() {
        }).catch(function(error) {
        })
    },
    onUpdateNavigationDrawer (newValue) {
      console.log('come from event to update drawer... ' + newValue)      
      this.publicDrawer = newValue      
    }
    // clickedOnDrawer (str) {
    //   this.publicDrawer = false
    //   if (str === '#inscreva-se') {
    //     this.dialogInscrevase = true
    //   }
    // }
  }
}
</script>