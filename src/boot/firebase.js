import * as firebase from "firebase/app"

import "firebase/database"
import "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyA5YaJqby3wsXDiCtA6F9oWhxYhv7eQ8M8",
  authDomain: "smackchat-7158f.firebaseapp.com",
  databaseURL: "https://smackchat-7158f-default-rtdb.firebaseio.com",
  projectId: "smackchat-7158f",
  storageBucket: "smackchat-7158f.appspot.com",
  messagingSenderId: "536661592218",
  appId: "1:536661592218:web:1ff27d2ead81009d3ab723"
};

let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export {firebaseAuth, firebaseDb}
