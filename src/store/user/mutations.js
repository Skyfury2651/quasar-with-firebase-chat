export default {
  setUserDetails(state, payload) {
    state.userDetails = payload
  },
  addUser(state, payload) {
    state.users[payload.userId] = payload.userDetails
  },
  updateUser(state, payload) {
    Object.assign(state.users[payload.userId], payload.userDetails)
  },
}
