<template>
  <div>
    <h3>当前的 count 值为：{{ count }}</h3>
    <button @click="sub">-1</button>&nbsp;&nbsp;
    <button @click="subN(3)">-N</button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  methods: {
    // 触发 mutations 的第 2 种方式
    ...mapMutations(['sub', 'subN'])
  },
  computed: {
    ...mapState(['count'])
  }
}
</script>
