<template lang="pug">
  div
    v-navigation-drawer(v-model='navigationDrawer' color='#fff' app temporary)
      .navIcon.my-2.mx-3
      v-list.pt-0.list
        v-list-tile(v-for='item in menu' :key='item.title' :href='item.target')
          v-list-tile-content
            v-list-tile-title(@click='clickedOnDrawer(item.target)') {{item.title}}
    v-dialog(v-model='dialogInscrevase' max-width='400px')
      v-card
        v-card-text
          | Deseja ser um s&oacute;cio do Instituto &Ecirc;xito ou voc&ecirc; deseja participar da experi&ecirc;ncia de ser um Empreendedor
          | conosco?
        v-card-actions
          v-btn(target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSdNDN07du2LCsaCEJ_2VAF4wfWCHsDNUSufRrQmVnwG8BDpnQ/viewform?usp=sf_link') Seja s&oacute;cio
          v-spacer
          v-btn(target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSfrJReVK-TFUxC6w-RZeMe5PYnniCDtj8zrPoqWY8E3WZ6qfA/viewform?usp=sf_link') Quero empreender
</template>

<script>

import Menu from '../../api/menu'

export default {
  props: {
    drawer: {
      type: Boolean
    }
  },
  computed: {
    navigationDrawer: {
      get () {
        return this.drawer
      },
      set (val) {
        if (val === false) {
          this.$emit('update-navigation-drawer', val)
        }
      }
    }
  },
  methods: {
    clickedOnDrawer (str) {
      // this.drawer = false
      this.navigationDrawer = false
      if (str === '#inscreva-se') {
        this.dialogInscrevase = true
      }
    }
  },
  data () {
    return {
      menu: Menu,
      dialogInscrevase: false
    }
  }
}
</script>
