import {firebaseAuth, firebaseDb} from "boot/firebase";
import firebase from "firebase";
import {root} from "app/.eslintrc";

export default {
  registerUser({}, payload) {
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password).then(response => {
      let userId = firebaseAuth.currentUser.uid
      firebaseDb.ref('users/' + userId).set({
        name: payload.name,
        email: payload.email,
        online: true
      })
    })
      .catch(error => {
        console.log(error.message)
      })
  },
  loginUser({}, payload) {
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password).then(response => {
      // console.log(response)
    }).catch(error => {
      console.log(error.message)
    })
  },
  handleAuthStateChanged({commit, dispatch, state}) {
    firebaseAuth.onAuthStateChanged(user => {
      if (user) {
        let userId = firebaseAuth.currentUser.uid
        firebaseDb.ref('users/' + userId).once('value', snapshot => {
          let userDetails = snapshot.val()
          commit('setUserDetails', {
            name: userDetails.name,
            email: userDetails.email,
            userId: userId
          })
        })
        dispatch('firebaseUpdatedUser', {
          userId: userId,
          updates: {
            online: true
          }
        })
        dispatch('firebaseGetUsers')
        this.$router.push('/')
      } else {
        dispatch('firebaseUpdatedUser', {
          userId: state.userDetails.userId,
          updates: {
            online: false
          }
        })
        commit('setUserDetails', {})
        this.$router.replace('/auth')
      }
    })
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  firebaseUpdatedUser({}, payload) {
    firebaseDb.ref('users/' + payload.userId).update(payload.updates)
  },
  firebaseGetUsers({commit}) {
    firebaseDb.ref('users').on('child_added', snapshot => {
      let userDetails = snapshot.val()
      let userId = snapshot.key
      commit('addUser', {
        userId,
        userDetails
      })
    })
    firebaseDb.ref('users').on('child_changed', snapshot => {
        let userDetails = snapshot.val()
        let userId = snapshot.key
        commit('updateUser', {
          userId,
          userDetails
        })
      }
    )
  },
  firebaseGetMessages({commit, state}, otherUserId) {
    let userId = state.userDetails.userId
    var messageRef = firebaseDb.ref('chats/' + userId + '/' + otherUserId)
    messageRef.on('child_added',
      snapshot => {
        let messageDetails = snapshot.val()
        let messageId = snapshot.key
        // console.log(messageDetails)
        // console.log(messageId)
        commit('messages/addMessages', {
          messageId,
          messageDetails
        }, {root: true})
      })
  },
  firebaseStopGetMessages({commit, state}, otherUserId) {
    let userId = state.userDetails.userId
    var messageRef = firebaseDb.ref('chats/' + userId + '/' + otherUserId)
    messageRef.off('child_added')
    commit('messages/clearMessages', {}, {root: true})
  }
}
