import { categoriesCollection } from '@/data/FirebaseConfig'
import { firestoreAction } from 'vuexfire'

export default {
  namespaced: true,

  state: {
    categories: []
  },

  mutations: {
    setCategories (state, payload) {
      state.categories.push(payload)
    }
  },

  actions: {
    bindCategories: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('categories', categoriesCollection)
    }),

    getCategories: async ({ commit }) => {
      const retval = { error: false, message: '' }

      const refs = await categoriesCollection.get()

      refs.forEach(doc => { commit('setCategories', doc.data()) })

      return retval
    },

    loadCollectionIfNotExists: async ({ dispatch }) => {
      const retval = { error: false, message: 'categories exists' }

      const collectionExists = await categoriesCollection.get()

      if (!collectionExists.empty) return dispatch('getCategories')

      const categories = require('@/data/Categories').default

      const getval = await dispatch('loadCategories', categories)

      if (getval.errors > 0) return getval

      return retval
    },

    loadCategories: async ({ dispatch }, categories) => {
      const retval = { errors: 0, success: 0, messages: [] }

      categories.forEach(async (category) => {
        const getvalAdded = await categoriesCollection.add(category)

        if (getvalAdded.id) {
          const message = `Item with id: ${getvalAdded.id} added`
          retval.success += 1
          retval.messages.push(message)
          return
        }

        retval.errors += 1
        retval.messages.push(getvalAdded)
      })

      return retval
    },

    deleteCategories: async ({ commit }) => {
    }
  }
}
