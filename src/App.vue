<template>
  <v-app>
    <v-main>
      <Navbar />
      <router-view/>
      <Dialog/>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import Dialog from "./components/Dialog";
export default {
  name: 'App',
  components: {
    Navbar,
    Dialog,
  },
  data() {
    return {
      dialog: true
    }
  },
};
</script>
