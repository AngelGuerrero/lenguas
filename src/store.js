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
  store.commit('addTaskToQueue', {
    action: 'users/setCurrentUser',
    data: user,
    label: 'Validando sesión de usuario.'
  })
  //
  // Fetch user from the database
  store.commit('addTaskToQueue', {
    action: 'users/fetchUserProfile',
    data: user.uid,
    label: 'Obteniendo perfil.'
  })
  //
  // Execute the required initial functions
  store.dispatch('executeAsyncActions')
})

export const store = new Vuex.Store({
  state: {
    currentTask: '',

    queueTasks: []
  },

  getters: {
    performingInitialTasks: function (state) {
      return state.queueTasks.length > 0
    }
  },

  mutations: {
    ...vuexfireMutations,

    addTaskToQueue: (state, payload) => state.queueTasks.push(payload)
  },

  actions: {
    executeAsyncActions: ({ state, dispatch }) => {
      const showMessage = message => { state.currentTask = message }

      const fn = task => new Promise(resolve => {
        showMessage(`${task.label}, espere, por favor...`)
        dispatch(task.action, task.data).then(_ => state.queueTasks.shift())
        // External main thread ??
        setTimeout(() => resolve())
      })

      state.queueTasks.reduce((p, c) => fn(p).then(_ => fn(c)))
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
