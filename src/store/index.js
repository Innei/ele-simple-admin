import Vue from 'vue'
import Vuex from 'vuex'
// import user_data from './modules/user_data'
Vue.use(Vuex)

/* export default new Vuex.Store({
  modules: { user_data },
  //全局Store对象
  mutations: {},
  actions: {},
  state: {}
}) */
export default new Vuex.Store({
  strict: true, // 开启严格模式  确保state 中的数据只能 mutations 修改
  modules: {},
  state: {
    user_data: {
      username: null,
      email: null
    }
  },
  mutations: {
    setUser(state, username) {
      state.user_data.username = username
    },
    setEmail(state, email) {
      state.user_data.email = email
    }
  },
  actions: {},
  getters: {}
})

