import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC_ZN5w5j5zK2DmOgIDKkOexY4qlz3ULpk",
    authDomain: "bisser-application.firebaseapp.com",
    databaseURL: "https://bisser-application-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "bisser-application",
    storageBucket: "bisser-application.appspot.com",
    messagingSenderId: "636344405137",
    appId: "1:636344405137:web:fea93ff61c98ece92a4330",
    measurementId: "G-M7Q3CDCL2P"
  };

// Initialize firebase
firebase.initializeApp(firebaseConfig)

// Firebase Attributes 
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// Firebase timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

// Export 
export { projectFirestore, projectAuth, projectStorage, timestamp }