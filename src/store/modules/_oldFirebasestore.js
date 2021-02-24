// import { firestoreAction } from 'vuexfire'
// import { fbUsers, fbCategories, fbAnswers } from '@/data/firebaseconfig'
// import dataCategories from '@/data/categories'

// export default {
//   namespaced: true,

//   state: {
//   },

//   getters: {
//   },

//   actions: {
//     SAVE_USER: async ({ state, commit, dispatch }, { payload }) => {
//       //
//       // Get the ip
//       const client = await dispatch('GET_USER_IP')
//       payload.ip = client.ip
//       payload.isOnline = true
//       //
//       // Add a user in firebase
//       const retuser = await fbUsers.add(payload)
//       //
//       // Save the user id just created
//       const id = await retuser.id
//       //
//       // Bind created user with current user
//       state.user_id = id
//       localStorage.setItem('user_id', id)
//       dispatch('BIND_USER', id)
//       //
//       //
//       // Clear input data
//       commit('CLEAR_INPUT')
//     },

//     _BIND_USER: firestoreAction(({ state, dispatch, bindFirestoreRef }, id) => {
//       //
//       // If user exists bind to user
//       // else remote local storage
//       fbUsers
//         .doc(id)
//         .get()
//         .then(docSnapshot => {
//           if (docSnapshot.exists) {
//             state.user_id = id
//             bindFirestoreRef('user', fbUsers.doc(id))
//           } else {
//             state.user_id = null
//             state.user = {}
//             localStorage.removeItem('user_id')
//           }
//         })
//     }),

//     SAVE_ANSWERS: async ({ state, dispatch }, payload) => {
//       const id = state.user_id || localStorage.getItem('user_id')

//       //
//       // Save answers to firebase
//       await fbAnswers.add({
//         user_id: id,
//         answers: payload
//       })

//       //
//       // Add the answers to current user
//       const user = { ...state.user }
//       user.answers = payload

//       await fbUsers
//         .doc(id)
//         .set(user)
//         .then(() => console.log('Respuestas agregadas correctamente'))

//       dispatch('UPDATE_USER_FINISH_STATE', true)
//     },

//     GET_USER_IP: async () => {
//       const data = await fetch('https://api.ipify.org?format=json').then(res =>
//         res.json()
//       )

//       return data
//     }
//   }
// }
