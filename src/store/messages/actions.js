import {firebaseAuth, firebaseDb} from "boot/firebase";
import firebase from "firebase";

export default {
  firebaseSendMessage({}, payload) {
    console.log(payload.userId)
    console.log(payload.otherUserId)
    console.log(payload.message)
    firebaseDb.ref('chats/' + payload.userId + '/' + payload.otherUserId).push(payload.message)
    payload.message.from = 'them'
    firebaseDb.ref('chats/' + payload.otherUserId + '/' + payload.userId).push(payload.message)
  }
}
