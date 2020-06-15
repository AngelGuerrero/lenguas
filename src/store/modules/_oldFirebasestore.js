import { firestoreAction } from 'vuexfire'
import { fbUsers, fbCategories, fbAnswers } from '@/data/firebaseconfig'
import dataCategories from '@/data/categories'

export default {
  namespaced: true,

  state: {
    //
    // All users registered
    users: [],

    //
    // Categories from firebase
    categories: []
  },

  getters: {
    USER_HAS_SESSION: state => {
      const localUserId = localStorage.getItem('user_id') || state.user_id

      localUserId || state.user_id
        ? console.log(`El usuario tiene un id: ${localUserId || state.user_id}`)
        : console.log('El usuario no tiene sesión iniciada')

      const retval =
        localUserId || state.user_id
          ? { ok: true, id: localUserId || state.user_id }
          : { ok: false, id: null }

      return retval
    },

    USER_HAS_FINISHED: state =>
      state.user.answers && state.user.answers.length > 0
  },

  actions: {
    BIND_USERS: firestoreAction(({ bindFirestoreRef }) => {
      console.log('Loading users...')
      return bindFirestoreRef('users', fbUsers.where('isAdmin', '==', false))
    }),

    UNBIND_USERS: firestoreAction(({ unbindFirestoreRef }) => {
      unbindFirestoreRef('users')
    }),

    BIND_CATEGORIES: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('categories', fbCategories)
    }),

    LOAD_CATEGORIES_IF_NOT_EXISTS: ({ dispatch }, payload) => {
      fbCategories.get().then(querySnapshot => {
        if (querySnapshot.size <= 0) {
          dataCategories.map(data =>
            fbCategories
              .add(data)
              .then(cat => console.log(`Item: ${cat.name} added`))
          )
        }
      })

      dispatch('BIND_CATEGORIES')
    },

    SWITCH_USER_ONLINE_STATUS: ({ getters }, payload) => {
      fbUsers
        .doc(getters.USER_HAS_SESSION.id)
        .update({ isOnline: payload })
        .then(() =>
          console.log(
            payload
              ? 'user online status changed'
              : 'user offline status changed'
          )
        )
    },

    UPDATE_USER_FINISH_STATE: ({ getters }, payload) => {
      fbUsers
        .doc(getters.USER_HAS_SESSION.id)
        .update({ hasFinished: payload })
        .then(() =>
          console.log(
            `Actualizando el estado del usuario del juego: ${payload}`
          )
        )
    },

    SAVE_USER: async ({ state, commit, dispatch }, { payload }) => {
      //
      // Get the ip
      const client = await dispatch('GET_USER_IP')
      payload.ip = client.ip
      payload.isOnline = true
      //
      // Add a user in firebase
      const retuser = await fbUsers.add(payload)
      //
      // Save the user id just created
      const id = await retuser.id
      //
      // Bind created user with current user
      state.user_id = id
      localStorage.setItem('user_id', id)
      dispatch('BIND_USER', id)
      //
      //
      // Clear input data
      commit('CLEAR_INPUT')
    },

    BIND_USER: firestoreAction(({ state, dispatch, bindFirestoreRef }, id) => {
      //
      // If user exists bind to user
      // else remote local storage
      fbUsers
        .doc(id)
        .get()
        .then(docSnapshot => {
          if (docSnapshot.exists) {
            state.user_id = id
            bindFirestoreRef('user', fbUsers.doc(id))
          } else {
            state.user_id = null
            state.user = {}
            localStorage.removeItem('user_id')
          }
        })
    }),

    UNBIND_USER: firestoreAction(({ state, unbindFirestoreRef }) => {
      state.user_id = null
      // state.user = {}
      localStorage.removeItem('user_id')
      unbindFirestoreRef('user')
    }),

    LOGIN: firestoreAction(({ dispatch, bindFirestoreRef }, payload) => {
      dispatch('SAVE_USER', { bindFirestoreRef, payload })
    }),

    LOGOUT: firestoreAction(({ getters, dispatch }) => {
      const { ok } = getters.USER_HAS_SESSION

      if (!ok) return

      //
      // Show that the user is not active
      dispatch('SWITCH_USER_ONLINE_STATUS', false)
      //
      dispatch('UNBIND_USER')
    }),

    SAVE_ANSWERS: async ({ state, dispatch }, payload) => {
      const id = state.user_id || localStorage.getItem('user_id')

      //
      // Save answers to firebase
      await fbAnswers.add({
        user_id: id,
        answers: payload
      })

      //
      // Add the answers to current user
      const user = { ...state.user }
      user.answers = payload

      await fbUsers
        .doc(id)
        .set(user)
        .then(() => console.log('Respuestas agregadas correctamente'))

      dispatch('UPDATE_USER_FINISH_STATE', true)
    },

    GET_USER_IP: async () => {
      const data = await fetch('https://api.ipify.org?format=json').then(res =>
        res.json()
      )

      return data
    }
  }
}
