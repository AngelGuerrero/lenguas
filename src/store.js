import Vue from 'vue'
import Vuex from 'vuex'
import { firebase, logsCollection } from '@/data/FirebaseConfig'
import { vuexfireMutations } from 'vuexfire'

import ui from '@/store/modules/UI'
import users from '@/store/modules/Users'
import games from '@/store/modules/Games'

Vue.use(Vuex)

//
// Handle reload window
firebase.auth().onAuthStateChanged(user => {
  if (!user) return

  //
  // Set the user from firebase authentication
  store.commit('users/setCurrentUser', user)
  //
  // Fetch user from the database
  store.dispatch('users/fetchUserProfile', user.uid)
})

export const store = new Vuex.Store({
  state: {
    performingInitialState: true,

    actions: [],

    queueActions: []
  },

  mutations: {
    ...vuexfireMutations,

    pushActionResolve (state, value) {
      state.actions.push(value)
    },

    setInitialState (state, value) {
      state.performingInitialState = value
    }
  },

  actions: {
    executeAsyncActions: ({ state: { actions }, dispatch }) => {
      actions.map((action) => {
        dispatch(action)
      })
    },

    asyncFunction: ({ context }) => {
      setTimeout(() => {
        console.log('Acción resuelta')
      }, 5000)
    },

    pushAsyncLog: ({ state }, payload) => {
      const {
        users: { currentUser }
      } = state

      payload.session = {
        user: {
          uid: currentUser.uid,
          email: currentUser.email
        }
      }
      payload.date = new Date()

      logsCollection
        .add(payload)
        .catch(error => console.log(`Error: Unable to log. ${error}`))
    },

    getDataByQuery: async ({ context }, query) => {
      const retval = { error: false, message: 'ok', data: null }

      try {
        const list = []
        const dataRef = await query.get()
        const snapshot = await dataRef
        const documents = await snapshot

        documents.forEach(snapshot => list.push(snapshot.data()))

        retval.data = list
      } catch (error) {
        retval.error = true
        retval.message = 'Error getting data'
      }

      return retval
    }
  },

  modules: {
    ui,
    users,
    games
  }
})
