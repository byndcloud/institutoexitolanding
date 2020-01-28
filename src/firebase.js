import { firebase } from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'
import '@firebase/storage'
// Initialize Cloud Firestore through Firebase

export default new class Firebase {
  constructor () {
    this.firebase = firebase
    this.app = firebase.initializeApp({
      apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
      authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.VUE_APP_FIREBASE_APP_ID
    })

    this.firestore = this.app.firestore()
    this.storage = this.app.storage()
  }
}()
