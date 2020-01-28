<style lang="stylus">
.page-wrapper {
  height: calc(100vh - 30px);
}

img {
  max-height: 90vh;
  max-width: 90vw;
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>

<template>
  <div id="appRoot">
    <template>
      <v-app id="inspire" class="app" style="background-color: #4d57a6;">
        <v-layout align-center justify-center style="background-color: #4d57a6;">
          <v-flex style="background-color: #4d57a6;">
            <img src="static/img.png">
          </v-flex>
        </v-layout>
      </v-app>
    </template>
  </div>
</template>
<script>
export default {}
</script>
