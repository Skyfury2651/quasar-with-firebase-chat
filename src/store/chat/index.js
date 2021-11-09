import state from "src/store/chat/state"
import actions from "src/store/chat/actions"
import mutations from "src/store/chat/mutations"
import getters from "src/store/chat/getter"

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
