<template>
  <div class="header">
    <button v-if="loggedIn === true" id="logoutBtn" @click="logout">
      LOGOUT
    </button>
    <h1 id="title">my EVENT LIST</h1>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Header",
  computed: mapState(["loggedIn"]),
  methods: {
    logout() {
      this.$store.dispatch("logout");
      if (!this.$store.state.loggedIn) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style scoped>
#title {
  font-size: 25px;
  text-align: left;
  background-color: rgb(46, 46, 46);
  border-radius: 2px;
  padding: 3px;
  padding-bottom: 0px;
  margin-left: 5px;
  width: 180px;
  color: white;
}
#logoutBtn {
  float: right;
  margin-right: 10px;
  width: 10vw;
  height: 40px;
  font-size: 15px auto;
  cursor: pointer;
  border: none;
  background-color: rgb(46, 46, 46);
  border-radius: 3px;
  color: white;
  font-weight: 300;
}
</style>
