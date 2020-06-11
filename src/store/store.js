import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import ui from '@/store/modules/UserInterfaceStore'
import firebase from '@/store/modules/FirebaseStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  getters: {},

  mutations: { ...vuexfireMutations },

  actions: {},

  modules: {
    ui,
    firebase
  }
})
