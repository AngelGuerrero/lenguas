import { usersCollection, firebase } from '@/data/firebaseconfig'
import { firestoreAction } from 'vuexfire'

export default {
  namespaced: true,

  state: {
    currentUser: null,

    users: []
  },

  actions: {
    bindUsers: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef('users', usersCollection)
    }),

    createUserAccount: async ({ dispatch }, user) => {
      const retval = { error: false, message: '', data: null }

      const getvalUserWithEmailAndPassword = await dispatch('createUserWithEmailAndPassword', user)

      //
      // Error creating user with email and password ?
      if (getvalUserWithEmailAndPassword.error) return getvalUserWithEmailAndPassword

      //
      // Save just created user to collection
      //
      // Do not save password in database
      delete user.password

      const getvalUserSavedToCollection = await dispatch('saveUserToUsersCollections', {
        uid: getvalUserWithEmailAndPassword.data.user.uid,
        user
      })

      //
      // Error saving user to collection ?
      if (getvalUserSavedToCollection.error) return getvalUserSavedToCollection

      retval.message = 'Cuenta de usuario creada correctamente'
      retval.data = getvalUserSavedToCollection.data

      return retval
    },

    createUserWithEmailAndPassword: async ({ dispatch }, user) => {
      const retval = { error: false, message: '', data: null }

      const createdUser = await firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
        .catch(error => {
          retval.error = true
          retval.message = error.message
        })

      //
      // Error saving user with email with password
      if (retval.error) return retval

      retval.message = 'account created'
      retval.data = createdUser

      return retval
    },

    saveUserToUsersCollections: async ({ context }, { uid, user }) => {
      const retval = { error: false, message: '', data: null }

      await usersCollection
        .doc(uid)
        .set(user)
        .catch((err) => {
          retval.error = true
          retval.message = err.message
        })

      //
      // Error saving user to collections
      if (retval.error) return retval

      retval.message = 'user saved'
      retval.data = uid

      return retval
    },

    signInWithEmailAndPassword: async ({ context }, { email, password }) => {
      const retval = { error: false, message: 'ok', data: null }

      await firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(error => {
          console.log('error :>> ', error)
          retval.error = true
          retval.message = error.message
        })

      return retval
    },

    // #region [ Blue ] Queries

    getUserByQuery: async ({ context }, query) => {
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
        retval.message = 'Error getting users'
      }

      return retval
    },

    getUserByNickName: async ({ dispatch }, nickname) => {
      const retval = { error: false, message: '', data: null }

      const query = await usersCollection.where('nickname', '==', nickname)

      const getval = await dispatch('getUserByQuery', query)

      //
      // Error fetching data ?
      if (getval.error) return getval

      try {
        const user = getval.data.find(user => user.nickname === nickname)

        if (user) {
          retval.data = user
          retval.message = 'Usuario encontrado'
        } else {
          retval.error = true
          retval.message = 'Usuario no encontrado'
        }
      } catch (error) {
        retval.error = true
        retval.message = error.message
      }

      return retval
    },

    getUserByEmail: async ({ dispatch }, email) => {
      const retval = { error: false, message: '', data: null }

      const query = await usersCollection.where('email', '==', email)

      const getval = await dispatch('getUserByQuery', query)

      //
      // Error fetching data ?
      if (getval.error) return getval

      try {
        const user = getval.data.find(user => user.email === email)

        if (user) {
          retval.data = user
          retval.message = 'Usuario encontrado'
        } else {
          retval.error = true
          retval.message = 'Usuario no encontrado'
        }
      } catch (error) {
        retval.error = true
        retval.message = error.message
      }

      return retval
    }

    // #endregion
  }
}
