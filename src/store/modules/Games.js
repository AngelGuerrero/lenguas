import { answersCollection, gamesCollection } from '@/data/FirebaseConfig'
// import { firestoreAction } from 'vuexfire'

export default {
  namespaced: true,

  state: {
    // categories: []
  },

  mutations: {
    // setCategories (state, payload) {
    //   state.categories.push(payload)
    // }
  },

  actions: {
    saveAnswers: async ({ context }, { payload }) => {
      const retval = { error: false, message: '' }

      await answersCollection
        .add(payload)
        // .then((response) => {
        //   retval.message = `Answers saved successfully with id ${response.id}`
        // }).catch((error) => {
        //   retval.error = true
        //   retval.message = error
        // })

      return retval
    },

    createGameIfNotExists: async ({ context }, { name, payload }) => {
      const retval = { error: false, message: '' }

      await gamesCollection
        .doc(`${name}`)
        .set(payload)
        .then(() => {
          retval.message = `Juego ${name}, actualizado correctamente`
        }).catch(error => {
          retval.error = true
          retval.message = error
        })

      return retval
    },

    getGameByName: async ({ dispatch }, name) => {
      const retval = { error: false, message: '', data: null }

      const game = await gamesCollection.doc(name)

      //
      // Error getting data ?
      if (!game.id) return { error: true, message: 'Juego no encontrado' }

      retval.data = game
      retval.message = 'Juego encontrado'

      return retval
    }

    //
    // Fix: Component crash when data is remote
    //
    // bindCategories: firestoreAction(({ bindFirestoreRef }) => {
    //   return bindFirestoreRef('categories', categoriesCollection)
    // }),

    // getCategories: async ({ commit }) => {
    //   const retval = { error: false, message: '' }

    //   const refs = await categoriesCollection.get()

    //   refs.forEach(doc => { commit('setCategories', doc.data()) })

    //   return retval
    // },

    // loadCollectionIfNotExists: async ({ dispatch }) => {
    //   const retval = { error: false, message: 'categories exists' }

    //   const collectionExists = await categoriesCollection.get()

    //   if (!collectionExists.empty) return dispatch('getCategories')

    //   const categories = require('@/data/Categories').default

    //   const getval = await dispatch('loadCategories', categories)

    //   if (getval.errors > 0) return getval

    //   return retval
    // },

    // loadCategories: async ({ dispatch }, categories) => {
    //   const retval = { errors: 0, success: 0, messages: [] }

    //   categories.forEach(async (category) => {
    //     const getvalAdded = await categoriesCollection.add(category)

    //     if (getvalAdded.id) {
    //       const message = `Item with id: ${getvalAdded.id} added`
    //       retval.success += 1
    //       retval.messages.push(message)
    //       return
    //     }

    //     retval.errors += 1
    //     retval.messages.push(getvalAdded)
    //   })

    //   return retval
    // }

  }
}
