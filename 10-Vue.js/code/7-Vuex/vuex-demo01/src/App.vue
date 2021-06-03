<template>
  <div id="app">
    <add-count />
    <subtract-count />
  </div>
</template>

<script>
import Addition from "./components/Addition";
import Subtraction from "./components/Subtraction";
export default {
  name: "App",
  components: {
    "add-count": Addition,
    "subtract-count": Subtraction
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
