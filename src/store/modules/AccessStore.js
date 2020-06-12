// import { firestoreAction } from 'vuexfire'
import {
  fbUsers
  // fbCategories,
  // fbAnswers
} from '@/data/firebaseconfig'

export default {
  namespaced: true,

  state: {},

  getters: {},

  mutations: {},

  actions: {
    getUserByNickName: async ({ context }, nickname) => {
      let user = null
      const users = []
      const userRef = await fbUsers.where('nickname', '==', nickname).get()
      const snapshot = await userRef
      const documents = await snapshot

      documents.forEach(snapshot => users.push(snapshot.data()))

      try {
        const finded = users.find(user => user.nickname === nickname)
        user = finded || null
      } catch (error) {
        console.log(error)
      }

      return user
    },

    isNickNameTaken: async ({ dispatch }, nickname) => {
      const retval = await dispatch('getUserByNickName', nickname)
      // console.log(`Nickname: ${nickname} is taken? ${retval != null}`)
      return retval != null
    }
  }
}
