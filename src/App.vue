<template>
  <v-app  data-vue-component-name="App">
    <v-main>
      <Navbar />
      <router-view/>
      <ResultDialog v-if="isShowResultDialog" />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    Navbar: () => import('./components/Navbar'),
    ResultDialog: () => import('./components/ResultDialog'),
  },
  computed: {
    isShowResultDialog() {
      return this.$store.state.selectedPlace;
    },
  },
};
</script>

<style>
a{
  text-decoration: none;
}
</style>
