<template>
  <div id="app">
    <Header />
    <Login v-if="loggedIn === false" />
    <EventList v-else-if="loggedIn === true" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Login from "./components/Login";
import EventList from "./components/EventList";
import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Login,
    EventList,
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
  margin-top: 60px;
}
</style>
