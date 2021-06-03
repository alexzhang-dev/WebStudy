<template>
  <div>
    <h3>当前的 count 值为：{{ count }}</h3>
    <button @click="sub">-1</button>&nbsp;&nbsp;
    <button @click="subN(3)">-N</button>&nbsp;&nbsp;
    <button @click="subAsync">-1 delay 1s</button>&nbsp;&nbsp;
    <button @click="subNAsync(4)">-N delay 1s</button>&nbsp;&nbsp;
    <span>{{ showNum }}</span>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    // 触发 mutations 的第 2 种方式
    ...mapMutations(['sub', 'subN']),
    // 触发 actions 的第 2 种方式
    ...mapActions(['subAsync', 'subNAsync'])
  },
  computed: {
    ...mapState(['count']),
    // 触发 Getters 的第2种方式
    ...mapGetters(['showNum'])
  }
}
</script>
