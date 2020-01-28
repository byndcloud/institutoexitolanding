<template lang="pug">
v-content(style='min-height: 300px')
  v-container
    v-layout(wrap='' row='' justify-center='' align-center='')
      v-flex.text-xs-center
        v-icon.up-down(style='font-size: 150px') layers
        br
        h1.font-weight-thin(style='color: rgba(0,0,0,0.54);') Carregando {{name}}
        br
</template>

<script>
export default {
  props: {
    name: {
      type: String
    }
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
