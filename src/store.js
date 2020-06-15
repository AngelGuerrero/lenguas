import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import ui from '@/store/modules/UserInterfaceStore'
import users from '@/store/modules/UsersStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  getters: {},

  mutations: { ...vuexfireMutations },

  actions: {},

  modules: {
    ui,
    users
  }
})
