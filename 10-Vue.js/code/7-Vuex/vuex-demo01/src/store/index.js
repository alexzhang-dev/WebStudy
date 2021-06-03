import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    add(state) {
      state.count++
    },
    addN(state, num) {
      state.count += num
    },
    sub(state) {
      state.count--
    },
    subN(state, num) {
      state.count -= num
    }
  },
  actions: {},
  modules: {}
})
