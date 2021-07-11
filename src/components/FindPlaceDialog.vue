<template>
  <v-dialog
      @close-dialog="closeHandler"
      data-vue-component-name="FindPlaceDialog"
      class="dialog-st"
      ref="dialog"
      v-model="$store.state.dialog"
      @input="closeHandler"
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
              ref="closeBtn"
              text
              @click="dialog.value = false"
          >Close</v-btn>
        </v-card-actions>
        <v-btn
            v-if="selectedPlace"
            @click="bookPlace"
            depressed
            color="primary"
            class="st-action"
        >
          забронювати місце
        </v-btn>
      </v-card>
    </template>
  </v-dialog>
</template>


<script>
//todo   "row": {int},  "seat": {int}, Апи сделано так что я должен смотреть кино в одиночестве
import {mapMutations} from 'vuex'

export default {
  name: "FindPlaceDialog",
  props: {
    name: {
      required: true,
      type: String,
    }
  },
  data() {
    return {
      places: [],
      selectedPlace: null,
      isClearDataByHideDialog: true,
    }
  },
  computed: {
    getDate() {
      const date =  this.$store.state.selectedDate.split(' ');
      return {
        date: date[0],
        time: date[1]
      }
    },
    getPlace() {
      const place = this.selectedPlace.split(' ');
      return {
        place: place[0],
        row: place[1],
      }
    },
  },
  methods: {
    ...mapMutations(['SET_SELECTED_PLACE', 'SET_SELECT_FILM_NAME', 'SET_DIALOG', 'SET_SELECTED_DATE']),
    closeHandler() {
      this.SET_DIALOG(false);
      if (this.isClearDataByHideDialog) {
        this.SET_SELECTED_DATE(null);
        this.$emit('selectedRemove');
      }
    },
    async bookPlace() {
      const id = +this.$route.params.id;
      const {date, time} = this.getDate;
      const {row, place} = this.getPlace;
      try {
        await this.$api.bookPlace(id, +row, +place, time, date);
      } catch(e) {
        console.log(e);
      }
      this.SET_SELECTED_PLACE(this.getPlace);
      this.SET_SELECT_FILM_NAME(this.name);
      this.isClearDataByHideDialog = false;
      this.closeDialog();
    },
    closeDialog() {
      const dialog = this.$refs['closeBtn'];
      dialog.$el.click();
    },
    isDisabled(row) {
      return row.is_free ? 'free' : 'disabled';
    },
    isActiveChip(row, place) {
      const res = `${row.seat} ${place}`;
      return this.selectedPlace === res ? 'active' : '';
    },
    placeHandler(row, place) {
      const res = `${row.seat} ${place}`;
      if (!row.is_free) return;
      if ( this.selectedPlace === res) {
        this.selectedPlace = '';
        return false;
      }
      this.selectedPlace = res;
    }
  },
  async mounted() {
    const {date, time} = this.getDate;
    this.places = await this.$api.showPlaces(+this.$route.params.id, time, date);
  }
}
</script>

<style lang="scss">
.dialog-st{
  position: relative;
}
.st-action{
  position: sticky !important;
  bottom: 0 !important;
  width: 100%;
}
.v-chip{
  margin: 5px;
  &.active {
    background: #64B5F6 !important;
    color: white !important;
  }
}
</style>

