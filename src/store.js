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
firebase.auth().onAuthStateChanged(async user => {
  if (!user) return

  //
  // Add tasks to the queue to resolve later when load main App component
  //
  //
  // Set the user from firebase authentication
  store.commit('addTaskToQueue', {
    action: 'users/setCurrentUser',
    data: user,
    label: 'Validando sesión de usuario'
  })
  //
  // Fetch user from the database
  store.commit('addTaskToQueue', {
    action: 'users/fetchUserProfile',
    data: user.uid,
    label: 'Obteniendo perfil'
  })
  //
  //
  store.commit('addTaskToQueue', {
    action: 'games/createGameIfNotExists',
    data: {
      name: 'categorization',
      payload: {
        created: new Date()
      }
    },
    label: 'Cargando juegos'
  })
  //
  // Check if the words existing in firebase database
  // if not exists, then upload local data to firebase
  store.commit('addTaskToQueue', {
    action: 'games/loadCategoriesCollectionIfNotExists',
    data: null,
    label: 'Cargando idiomas'
  })

  store.dispatch('executeAsyncActions')
})

export const store = new Vuex.Store({
  state: {
    currentTask: '',

    queueTasks: []
  },

  getters: {
    performingInitialTasks: function (state) { return state.queueTasks.length > 0 }
  },

  mutations: {
    ...vuexfireMutations,

    addTaskToQueue: (state, payload) => state.queueTasks.push(payload),

    shiftTaskFromQueue: (state) => state.queueTasks.shift()
  },

  actions: {
    executeAsyncActions: async ({ state, commit, dispatch }) => {
      const fn = (task, ms) => new Promise(resolve => {
        const getval = dispatch(task.action, task.data)
        setTimeout(_ => resolve(getval), ms)
      })

      const queue = Array.from(state.queueTasks)
      for (const task of queue) {
        state.currentTask = `${task.label}, espere, por favor...`
        await fn(task, 0).then(response => {
          console.log(response)
          commit('shiftTaskFromQueue')
        })
      }
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
