<template>
  <div id="app">
    <todos></todos>
  </div>
</template>

<script>
  import Todos from './components/Todos'
  export default {
    name: 'App',
    components: {
      todos: Todos,
    },
    created() {
      this.$store.dispatch('getTodoData')
    },
  }
</script>

<style></style>
