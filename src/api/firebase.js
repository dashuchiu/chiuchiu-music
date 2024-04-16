// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAeNuf49yvIaolT7bsryyHT42mhwG1QJdo',
  authDomain: 'chiuchiu-music.firebaseapp.com',
  projectId: 'chiuchiu-music',
  storageBucket: 'chiuchiu-music.appspot.com',
  messagingSenderId: '876889799744',
  appId: '1:876889799744:web:6022aa2c36738c033a33a5'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
