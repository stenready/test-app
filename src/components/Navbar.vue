<template>
  <v-app-bar color="deep-purple darken-3 st-app-bar" data-vue-component-name="Navbar">
    <v-toolbar-title>DneprCinema</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style lang="scss">
.st-app-bar{
  .v-toolbar__content{
    justify-content: center;
    .v-toolbar__title{
      color: white;
    }
  }
}
</style>
