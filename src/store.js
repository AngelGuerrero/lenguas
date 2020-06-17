import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations } from 'vuexfire'

import ui from '@/store/modules/UI'
import users from '@/store/modules/Users'
import games from '@/store/modules/Games'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},

  getters: {},

  mutations: { ...vuexfireMutations },

  actions: {},

  modules: {
    ui,
    users,
    games
  }
})
