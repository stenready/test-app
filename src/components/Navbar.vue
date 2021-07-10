<template>
  <v-app-bar color="deep-purple darken-3 st-app-bar" data-vue-component-name="Navbar">
    <v-toolbar-title>DneprCinema</v-toolbar-title>
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
  .v-toolbar__content{
    //justify-content: center;
    .v-toolbar__title{
      color: white;
    }
  }
}
</style>
