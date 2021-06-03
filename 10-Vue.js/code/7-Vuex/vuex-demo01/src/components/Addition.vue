<template>
  <div>
    <h3>当前的 count 值为：{{ count }}</h3>
    <button @click="add">+1</button>&nbsp;&nbsp;
    <button @click="addN">+N</button>&nbsp;&nbsp;
    <button @click="addDelay">+1 delay 1s</button>&nbsp;&nbsp;
    <button @click="addNDelay">+N delay 1s</button>&nbsp;&nbsp;
    <span>{{ $store.getters.showNum }}</span>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  methods: {
    add() {
      this.$store.commit('add')
    },
    addN() {
      // this.$store.commit('add')
      // 带参数的触发 mutataion
      this.$store.commit('addN', 3)
    },
    addDelay() {
      // 使用 dispatch 来触发 action
      this.$store.dispatch('addAsync')
    },
    addNDelay() {
      // 触发带参数的 action
      this.$store.dispatch('addNAsync', 4)
    }
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>
