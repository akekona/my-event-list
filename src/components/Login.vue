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
      /><br />
      <label for="password">Password:</label>
      <input
        type="password"
        v-model="password"
        id="password"
        name="password"
      /><br />
      <input type="submit" value="Login" />
    </form>
    <router-link to="/register">Register</router-link>
    <p class="loginError" v-if="incorrectLoginCredentials === true">
      Username or password is incorrect. Please try again.
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      incorrectLoginCredentials: false,
    };
  },
  methods: {
    async login() {
      let username = this.username;
      let password = this.password;
      const success = await this.$store.dispatch("login", {
        username,
        password,
      });
      if (success) {
        this.$router.push("/events");
      } else {
        this.incorrectLoginCredentials = true;
      }
    },
  },
};
</script>

<style>
label {
  display: inline-block;
  width: 100px;
  text-align: right;
}
input {
  margin: 5px;
  width: 150px;
  box-sizing: border-box;
  align-items: right;
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
.loginError {
  color: rgb(197, 12, 12);
}
</style>
