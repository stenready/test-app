import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDate: '',
    dialog: false,
    selectedPlace: null,
    selectFilmName: null,
  },
  mutations: {
    CLEAR_DATA(state) {
      state.selectedPlace = null;
      state.selectFilmName = null;
      state.selectedDate = null;
      state.dialog = false;
    },
    SET_SELECT_FILM_NAME(state, name) {
      state.selectFilmName = name;
    },
    SET_SELECTED_DATE(state, payload) {
      state.selectedDate = payload;
    },
    SET_DIALOG(state, bool) {
      state.dialog = bool;
    },
    SET_SELECTED_PLACE(state, payload) {
      state.selectedPlace = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
