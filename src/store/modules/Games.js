import { answersCollection, gamesCollection, categoriesCollection, db } from '@/data/FirebaseConfig'
// import { firestoreAction } from 'vuexfire'

export default {
  namespaced: true,

  state: {
    // List of the available languages
    //
    categories: []
  },

  mutations: {
    setCategories: (state, payload) => state.categories.push(payload)
  },

  actions: {
    saveAnswers: async ({ context }, { payload }) => {
      const retval = { error: false, message: '' }

      await answersCollection
        .add(payload)
        .then((response) => {
          retval.message = `Answers saved successfully with id ${response.id}`
        }).catch((error) => {
          retval.error = true
          retval.message = error
        })

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
    },

    getCategories: async ({ state, commit }) => {
      const retval = { error: false, message: 'Categories loaded successfully' }

      if (state.categories.length > 0) {
        retval.message = 'Categories already exists'
        return retval
      }

      const refs = await categoriesCollection.get()

      refs.forEach(doc => { commit('setCategories', doc.data()) })

      return retval
    },

    loadCategoriesCollectionIfNotExists: async ({ dispatch }) => {
      const retval = { error: false, message: 'Categories already exists' }

      //
      // Collectin already exists?
      const collectionExists = await categoriesCollection.get()
      if (!collectionExists.empty) return retval

      //
      // Upload initial data to firebase
      const categories = require('@/data/Categories').default
      const getval = await dispatch('loadCategories', categories)

      // return getval
      return getval
    },

    loadCategories: async ({ dispatch }, categories) => {
      const retval = { error: false, message: 'Categories loaded successfully' }

      categories.forEach(async (category) => {
        await db
          .collection('games')
          .doc('categorization')
          .collection('categories')
          .add(category)
          .catch((error) => {
            // report local error
            retval.error = true
            retval.message = error.message
            // report remote error
            dispatch(
              'pushAsyncLog',
              { error: true, message: retval.messages, event: 'Pushing categories' },
              { root: true }
            )
          })
      })

      return retval
    }
  }
}
