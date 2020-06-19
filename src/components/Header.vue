<template>
  <div class="header">
    <button id="logoutBtn" @click="logout">Logout</button>
    <h1 id="title">my EVENT LIST</h1>
  </div>
</template>

<script>
export default {
  name: "Header",
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
  font-size: 15px;
}
</style>
