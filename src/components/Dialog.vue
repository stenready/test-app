<template>
  <v-dialog
      ref="dialog"
      v-model="$store.state.dialog"
      transition="dialog-top-transition"
      max-width="600"
  >
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar
            color="primary"
            dark
        >Перевірте вільні місця</v-toolbar>
        <v-card-text>
          <div class="text-h2 pa-12">Hello world!</div>
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
export default {
  name: "Dialog",
  async mounted() {
    const date = this.$store.state.selectedDate.split(' ')
    const response = await this.$api.showPlaces(+this.$route.params.id, date[1], date[0])
    console.log(response, 'response')
  }
}
</script>

