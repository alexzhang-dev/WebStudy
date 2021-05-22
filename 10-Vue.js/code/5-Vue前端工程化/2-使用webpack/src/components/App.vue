<template>
  <!-- 这里定义 Vue 组件中的模板内容 -->
  <h1>这个是{{ vueName }}的组件的内容</h1>
</template>
script
<script>
export default {
  data() {
    return {
      vueName: "hello-vue!",
    };
  },
};
</script>

<style scoped>
/* 这里定义组件的样式 scoped表示样式只能在本组件内生效 */
h1 {
  color: red;
}
</style>
