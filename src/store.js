import Vue from 'vue'
import Vuex from 'vuex'
import { firebase } from '@/data/FirebaseConfig'
import { vuexfireMutations } from 'vuexfire'

import ui from '@/store/modules/UI'
import users from '@/store/modules/Users'
import games from '@/store/modules/Games'

Vue.use(Vuex)

//
// Handle reload window
firebase.auth().onAuthStateChanged((user) => {
  if (!user) return

  //
  // Set the user from firebase authentication
  store.commit('setCurrentUser', user)
  //
  // Fetch user from the database
  store.dispatch('users/bindUser', user.uid)
})

export const store = new Vuex.Store({
  state: {
    currentUser: {}
  },

  getters: { },

  mutations: {
    ...vuexfireMutations,

    setCurrentUser (state, payload) {
      state.currentUser = payload
    }
  },

  actions: {},

  modules: {
    ui,
    users,
    games
  }
})
