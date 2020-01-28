<template lang="pug">
v-content.ma-3.pa-0(fill-height)
  v-layout(v-if='members.length > 0' row wrap)
    v-flex(md4 sm12 v-for='member in members' :key="member['.uid']")
      v-card.ma-2(elevation='1' pa-0 min-height='240px')
        v-layout(row)
          v-flex(xs8)
            v-card-title(primary-title)
              v-layout(column)
                .title.font-weight-regular.mb-1 {{member.name}}
                div(v-if='member.role').subtitle.font-italic.mb-1 {{member.role}}
            v-card-text
              div(v-if='member.bio') {{member.bio}}
              div(v-else) Em breve uma breve biógrafia sobre este membro aqui!
          v-flex(v-if="member.gender === 'f'" xs4)
            v-img(v-if='member.img_url' :src='member.img_url' height='155px' contain)
            v-img(v-else src='https://i.imgur.com/d1Hiidy.png' height='155px' contain)
          v-flex(v-else xs5)
            v-img(v-if='member.img_url' :src='member.img_url' height='155px' contain)
            v-img(v-else src='https://i.imgur.com/EUqojOD.png' height='155px' contain)
</template>

<script>
export default {
  props: {
    members: {
      type: Array,
      default: () => []
    }
  }
}
</script>
