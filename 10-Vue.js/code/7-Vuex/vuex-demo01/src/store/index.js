import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0
  },
  // 只有 mutaions 中定义的函数才有权力修改 state 中的数据
  mutations: {
    add(state) {
      // 不要再 Mutation 函数中执行任何异步操作
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
  // action 用于异步操作 mutation
  actions: {
    addAsync(context) {
      setTimeout(() => {
        context.commit('add')
      }, 1000)
    },
    // 定义带参数的 action
    addNAsync(context, num) {
      setTimeout(() => {
        context.commit('addN', num)
      }, 1000)
    },
    subAsync(context) {
      setTimeout(() => {
        context.commit('sub')
      }, 1000)
    },
    // 定义带参数的 action
    subNAsync(context, num) {
      setTimeout(() => {
        context.commit('subN', num)
      }, 1000)
    }
  },
  // gettters 用于对 state 中的状态包装
  getters: {
    showNum: state => {
      return `当前最新的值是【${state.count}】`
    }
  }
})
