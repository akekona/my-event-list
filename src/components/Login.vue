<template>
  <div class="login">
    <form class="login-form" @submit.prevent="login">
      <label for="username">Username:</label>
      <input
        title="Username must be unique"
        type="text"
        v-model="username"
        id="username"
        name="username"
      />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" name="password" />
      <br />
      <input type="submit" value="Login" />
    </form>
    <router-link id="register-link" to="/register"
      >Create an account</router-link
    >
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      let username = this.username;
      let password = this.password;
      console.log(this.password);
      this.$store.dispatch("login", { username, password });
      this.$router.push("/events");
    },
  },
};
</script>

<style>
input {
  margin: 5px;
}
.login {
  border: 1px solid black;
  border-radius: 5px;
  display: inline-block;
  width: 60vw;
  padding: 10px;
}
.login-form {
  margin: 5px;
}
</style>
