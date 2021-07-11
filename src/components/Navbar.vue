<template>
  <v-app-bar color="deep-purple darken-3 st-app-bar" data-vue-component-name="Navbar">
    <router-link to="/">
      <v-toolbar-title class="logo">DneprCinema</v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-btn
        v-if="selectedDate"
        @click="SET_DIALOG(true)"
        depressed
        color="primary"
    >
      Перевірити місця на сеанс
    </v-btn>
  </v-app-bar>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  name: "Navbar",
  computed: {
    ...mapState({
      selectedDate: state => state.selectedDate,
    }),
  },
  methods: {
    ...mapMutations(['SET_DIALOG']),
  }
}
</script>

<style lang="scss">
.st-app-bar{
  .logo{
    cursor: pointer;
  }
  .v-toolbar__content{
    .v-toolbar__title{
      color: white;
    }
  }
}
</style>
