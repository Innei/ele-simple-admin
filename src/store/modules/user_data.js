// state
const state = {
  username: null,
  email: null
}
// mutations
const mutations = {
  setUser(state, username) {
    state.username = username
  },
  setEmail(state, email) {
    state.email = email
  }
}
// getters
const getters = {}
// actions
const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
