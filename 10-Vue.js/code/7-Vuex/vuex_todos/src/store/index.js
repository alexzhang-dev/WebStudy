import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 所有的任务列表
    data: [],
    // 输入的内容
    inputValue: '',
    // 下一个 id
    nextId: 5,
    // 视图的 key
    viewKey: 'all'
  },
  mutations: {
    initData(state, data) {
      state.data = data
    },
    inputChange(state, newValue) {
      state.inputValue = newValue
    },
    addTodo(state) {
      const obj = {
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.data.unshift(obj)
      // 让 id 加 1
      state.nextId++
      // 添加完成，让 inputValue 为空
      state.inputValue = ''
    },
    removeTodo(state, id) {
      const index = state.data.findIndex(item => {
        return item.id === id
      })
      state.data.splice(index, 1)
    },
    changeTodoStatus(state, id) {
      const index = state.data.findIndex(item => {
        return item.id === id
      })
      state.data[index].done = !state.data[index].done
    },
    // 清除已完成
    clear(state) {
      state.data = state.data.filter(item => item.done === false)
    },
    changeViewKey(state, newKey) {
      state.viewKey = newKey
    }
  },
  actions: {
    getTodoData(context) {
      // 由于请求数据是异步操作，所以需要放在 actions 中
      axios.get('/data.json').then(data => {
        // 由于 action 无法直接对 state 进行操作
        // 所以还是需要定义一个 mutation
        context.commit('initData', data.data)
      })
    }
  },
  getters: {
    // 统计未完成的任务条数
    unDoneLength(state) {
      return state.data.filter(item => item.done === false).length
    },
    // 根据不同的模式来得到不同的数据
    dymaicData(state) {
      let finalData = []
      switch (state.viewKey) {
        case 'all':
          finalData = state.data
          break
        case 'undone':
          finalData = state.data.filter(item => item.done === false)
          break
        case 'done':
          finalData = state.data.filter(item => item.done === true)
          break
      }
      return finalData
    }
  }
})
