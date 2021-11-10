export default {
  addMessages(state, payload) {
    state.messages[payload.messageId] = payload.messageDetails
  },
  clearMessages(state) {
    state.messages = {}
  }
}
