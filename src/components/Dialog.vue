<template>
  <v-dialog
      data-vue-component-name="Dialog"
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
        <div v-for="(place, idx) of places" :key="idx">
          <v-card-title>Ряд: {{place[0].row}} </v-card-title>
          <v-chip :class="[isActiveChip(row, place[0].row), isDisabled(row)]" v-for="(row, index) of place[1]" :key="index" @click="placeHandler(row, place[0].row)">
              {{row.seat}}
          </v-chip>
        </div>
        <v-card-text>
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
  data() {
    return {
      places: [],
      selectedPlace: null,
    }
  },
  watch: {
    selectedPlace(value) {
      console.log(value, 'ssa')
    }
  },
  methods: {
    isDisabled(row) {
      return row.is_free ? 'free' : 'disabled'
    },
    isActiveChip(row, place) {
      const res = `${row.seat} ${place}`
      return this.selectedPlace === res ? 'active' : ''
    },
    placeHandler(row, place) {
      const res = `${row.seat} ${place}`
      if (!row.is_free) return;
      if ( this.selectedPlace === res) {
        this.selectedPlace = ''
        return false
      }
      this.selectedPlace = res
    }
  },
  async mounted() {
    const date = this.$store.state.selectedDate.split(' ')
    const response = await this.$api.showPlaces(+this.$route.params.id, date[1], date[0])
    this.places = response
    console.log(response, 'sasa')
  }
}
</script>

<style lang="scss">
.v-chip{
  margin: 5px;
  &.active {
    background: #64B5F6 !important;
    color: white !important;
  }
}
</style>

