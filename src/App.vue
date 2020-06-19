<template>
  <div id="app">
    <Header />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header,
  },
  computed: mapState(["loggedIn"]),
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
html {
  background-color: rgb(255, 255, 255);
}

.btn {
  background-color: white;
  color: black;
  border-radius: 2px;
  border: gray solid 4px;
  font-weight: bold;
  outline: none;
  padding: 3px;
  cursor: pointer;
}
.btn:hover {
  background-color: #cccccc;
}
</style>
