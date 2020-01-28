<template lang="pug">
  v-toolbar.navbar(app color='white')
    v-toolbar-title.headline.text-uppercase
      .navIcon(@click="$router.push('/')" style="cursor: pointer")
    v-spacer
    v-layout.hidden-md-and-down(justify-end='' row='' align-center='')
      .navBtn(v-for='item in menu' :key='item.title' :href='item.target' v-if="!item.onlyMobile")
        a(:href="item.target") {{item.title}}
      //-
        .navBtn
        a(href='#sobre') Institucional
        .navBtn
          a(href='#educacao') Plataforma de cursos
        // <div class="navBtn"><a href="#">Mídias</a></div>
        .navBtn
          a(href='http://linhadiretadigital.com.br/revistaempreenda/#/inicio/321' target='_blank') Revista Empreenda
        // <div class="navBtn"><a href="#">Depoimentos</a></div>
        .navBtn
          a(href='#membros') Sócios
        .navBtn
          a(href='#desafios') Desafios
        .navBtn
          a(href='/eventos') Eventos
        .navBtn
          a(href='#contato') Contato
      v-menu(offset-y='' min-width='200px')
        template(v-slot:activator='{ on }')
          .navBtn(v-on='on')
            a(href='#') Inscreva-se
        v-list
          v-list-tile(target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSdNDN07du2LCsaCEJ_2VAF4wfWCHsDNUSufRrQmVnwG8BDpnQ/viewform?usp=sf_link')
            v-list-tile-title Seja s&oacute;cio
          v-list-tile(target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSfrJReVK-TFUxC6w-RZeMe5PYnniCDtj8zrPoqWY8E3WZ6qfA/viewform?usp=sf_link')
            v-list-tile-title Quero empreender
    v-layout.text-uppercase.hidden-lg-and-up(align-center='' justify-end='' row='' fill-height='')
      v-btn(icon='' @click='changeNavigationDrawer')
        v-icon(color='#828282') fas fa-bars
</template>

<script>
import Menu from '../../api/menu'
export default {
  props: {
    drawer: {
      type: Boolean
    }
  },
  data () {
    return {
      menu: Menu
    }
  },
  computed: {
    navigationDrawer () {
      return this.drawer
    }
  },
  methods: {
    changeNavigationDrawer () {
      this.$emit('update-navigation-drawer', true)
    }
  }
}
</script>
