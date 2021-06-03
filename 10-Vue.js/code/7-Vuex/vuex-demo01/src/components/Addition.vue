<template>
  <div>
    <h3>当前的 count 值为：{{ count }}</h3>
    <button @click="add">+1</button>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  methods: {
    add() {
      // this.$store.commit('add')
      // 带参数的触发 mutataion
      this.$store.commit('addN', 3)
    }
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>
