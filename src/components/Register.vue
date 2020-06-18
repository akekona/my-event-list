<template>
  <div class="register">
    <h2>Create an account</h2>
    <form class="register-form" @submit.prevent="register">
      <label for="firstName">First name:</label>
      <input type="text" v-model="firstName" id="firstName" name="firstName" />
      <br />
      <label for="lastName">Last name:</label>
      <input type="text" v-model="lastName" id="lastName" name="username" />
      <br />
      <label for="username">Username:</label>
      <input type="text" v-model="username" id="username" name="username" />
      <br />
      <label for="password">Password:</label>
      <input type="password" v-model="password" id="password" name="password" />
      <br />
      <input type="submit" value="Register" />
    </form>
    <br />
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
    };
  },
  methods: {},
};
</script>

<style scoped>
.register {
  display: inline-block;
}
.register-form {
  border: 1px solid black;
  border-radius: 5px;
  width: 60vw;
  padding: 10px;
}
</style>
