import { createStore } from 'vuex'

export default createStore({
  state: {
    authenticated: true,
  },
  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated
    }
  },
  actions: {
    setAuthenticated({ commit }, authenticated) {
      commit('setAuthenticated', authenticated)
    }
  },
  modules: {
  }
})
