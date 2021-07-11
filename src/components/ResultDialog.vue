<template>
  <v-dialog
      transition="dialog-top-transition"
      max-width="600"
      v-model="selectedPlace"
      data-vue-component-name="ResultDialog"
  >

    <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          v-bind="attrs"
          v-on="on"
      >From the top</v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Місце успішно заброньовано</v-toolbar>
        <v-card-text>
          <div class="title"> {{selectFilmName}} </div>
          <div class="date">
            {{selectedDate}}
          </div>
          <div class="place">
            Ряд: {{selectedPlace.row}} Место: {{selectedPlace.place}}
          </div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
              text
              @click="dialog.value = false"
          >Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: "ResultDialog",
  data() {
    return {
      dialog: true,
    }
  },
  computed: {
    ...mapState([
        'selectFilmName',
        'selectedPlace',
        'selectedDate'
    ]),
    selectedPlace: {
      get() {
        return this.$store.state.selectedPlace;
      },
      set() {
        this.$store.commit('CLEAR_DATA');
        this.$router.push('/');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.title{
  font-size: 20px;
}
.v-card__text{
  padding-top: 1rem;
}
</style>
