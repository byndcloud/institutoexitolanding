<template lang="pug">
  v-content
    br
    div(v-if='loading == true')
      exito-loading(name='Postagens do instagram')
    v-container(v-else grid-list-xl)
      v-layout
</template>

<script>
// import Firebase from '../firebase'
// import Media from '@dongido/vue-viaudio'

// my code
import ExitoLoading from '../components/Loading.vue'
// until here

export default {
  fiery: true,
  // my code
  components: {
    ExitoLoading
  },
  data () {
    return {
      drawer: true
    }
  },
  filters: {
  },
  methods: {
    onUpdateNavigationDrawer (newValue) {
      console.log('come from event to update drawer... ' + newValue)
      this.drawer = newValue
    }
  },
  created () {
    this.loading = true
  }
}

</script>

<style scoped>
.margin {
  margin: 1rem;
}
.up-down {
  animation: updown 2s linear infinite;
}

@keyframes updown {
  50% {
    margin-top: 10px
  }
}
</style>
