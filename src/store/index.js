import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectedDate: '',
    dialog: false,
  },
  mutations: {
    SET_SELECTED_DATE(state, payload) {
      state.selectedDate = payload;
    },
    SET_DIALOG(state, bool) {
      state.dialog = bool;
    },
  },
  actions: {
  },
  modules: {
  }
})
