// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: 'AIzaSyDEUM4FkuH6pWhYEa6RhwYX8EuPiFDjHRc',
  authDomain: 'spotify-24d75.firebaseapp.com',
  projectId: 'spotify-24d75',
  storageBucket: 'spotify-24d75.appspot.com',
  messagingSenderId: '1041679530593',
  appId: '1:1041679530593:web:473f023c876430f36ac820',
}
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
