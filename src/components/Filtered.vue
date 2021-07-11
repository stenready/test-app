<template>
  <v-card class="elevation-24 filtered-card"  data-vue-component-name="Filtered">
    <v-row>
      <v-col cols="6">
        <v-text-field v-model="searchByName" label="Пошук фільму за назвою"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-select
            :items="getGenres"
            label="Фільтрація за жанрами"
            solo
            ref="select"
            v-model="selected"
        >
          <template v-slot:prepend-item>
            <v-list-item class="prepend" @click="close"
            >
              <v-list-item-content>
                <v-list-item-title>
                  Всі жанри
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider>
          </template>
        </v-select>
      </v-col>
      <v-btn
          v-if="isShowClearButton"
          depressed
          color="primary"
          class="ml-2"
          @click="clearFilters"
      >
        Очистити фільтри
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
import { getGenres } from "@/constants";
export default {
  name: "Filtered",
  data() {
    return {
      searchByName: null,
      selected: null,
    }
  },
  computed: {
    getGenres,
    isShowClearButton() {
      return this.searchByName || this.selected;
    },
    isFilterCleared() {
      return !this.searchByName && !this.selected;
    }
  },
  watch: {
    selected() {
      this.emitFilterEvent();
    },
    searchByName() {
      this.emitFilterEvent();
    },
  },
  methods: {
    clearFilters() {
      this.selected = null;
      this.searchByName = '';
    },
    emitFilterEvent() {
      if (this.isFilterCleared) {
        this.$emit('filtered', 'clear');
      } else {
        let selectValue = this.getGenres.findIndex(el => el === this.selected);
        if (selectValue === -1) selectValue = null;
        this.$emit('filtered', {
          searchByName: this.searchByName,
          selected: selectValue
        })
      }
    },
    close() {
      this.$refs.select.blur();
      this.selected = null;
    }
  }

}
</script>

<style lang="scss">
.filtered-card{
  padding: 1rem;
}
.prepend{
  cursor: pointer;
}
</style>
