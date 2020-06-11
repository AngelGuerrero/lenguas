import firebase from 'firebase/app'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyCx35HZlAEEpCEDhHCCJToZew-BJb2EBXI',
  authDomain: 'app-lenguas-indigenas.firebaseapp.com',
  databaseURL: 'https://app-lenguas-indigenas.firebaseio.com',
  projectId: 'app-lenguas-indigenas',
  storageBucket: 'app-lenguas-indigenas.appspot.com',
  messagingSenderId: '602527794802',
  appId: '1:602527794802:web:71573d03c44881ae99e4eb'
}

// Initialize Firebase
const db = firebase.initializeApp(config).firestore()

//
// References
const fbUsers = db.collection('users')
const fbCategories = db.collection('categories')
const fbAnswers = db.collection('answers')

export {
  db,
  fbUsers,
  fbCategories,
  fbAnswers
}
