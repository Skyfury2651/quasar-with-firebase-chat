import state from "src/store/user/state"
import actions from "src/store/user/actions"
import mutations from "src/store/user/mutations"
import getters from "src/store/user/getter"

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
