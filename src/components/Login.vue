<template>
  <div class="login">
    <h2>Welcome</h2>
    <div class="loginFormContainer">
      <form class="loginForm" @submit.prevent="login">
        <label for="username">Username:</label>
        <input
          title="Username must be unique"
          type="text"
          v-model="username"
          id="username"
          name="username"
          required
        /><br />
        <label for="password">Password:</label>
        <input
          type="password"
          v-model="password"
          id="password"
          name="password"
          required
        /><br />
        <input id="loginBtn" class="btn" type="submit" value="LOGIN" />
      </form>
    </div>
    <p class="loginError" v-if="incorrectLoginCredentials === true">
      Username or password is incorrect. Please try again.
    </p>
    <router-link class="registerLink" to="/register">Register</router-link>
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
.loginFormContainer {
  border: 1px solid black;
  border-radius: 5px;
  width: 60vw;
  padding: 10px;
  background-color: rgb(46, 46, 46);
  color: white;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
}
.login {
  display: inline-block;
}
.loginForm {
  margin: 10px;
}
.loginError {
  color: rgb(197, 12, 12);
}
#loginBtn {
  margin-top: 25px;
}
</style>
