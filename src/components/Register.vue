<template>
  <div class="register">
    <h2>Create an account</h2>
    <form class="register-form" @submit.prevent="processRegistration">
      <label for="firstName">First name:</label>
      <input
        type="text"
        v-model="firstName"
        id="firstName"
        name="firstName"
        required
      /><br />
      <label for="lastName">Last name:</label>
      <input
        type="text"
        v-model="lastName"
        id="lastName"
        name="username"
        required
      /><br />
      <label for="username">Username:</label>
      <input
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
      /><br /><br />
      <input class="btn" type="submit" value="REGISTER" />
    </form>
    <br />
    <p class="errorMsg userNameTaken" v-if="userNameTaken === true">
      Username taken. Please select a different username.
    </p>
    <p class="errorMsg registerError" v-if="registerError === true">
      Error registering new user. Please try again.
    </p>
    <p class="errorMsg includesSpaces" v-if="includesSpaces === true">
      Fields may not contain spaces. Please try again.
    </p>
    <router-link to="/">Login</router-link>
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
      userNameTaken: false,
      registerError: false,
      includesSpaces: false,
    };
  },
  methods: {
    checkFields() {
      this.includesSpaces = false;
      const fields = [
        this.firstName,
        this.lastName,
        this.username,
        this.password,
      ];
      fields.forEach((inputField) => {
        if (/\s/.test(inputField)) {
          this.includesSpaces = true;
        }
      });
      return this.includesSpaces;
    },
    async processRegistration() {
      this.checkFields();
      if (this.includesSpaces) {
        return;
      } else {
        this.register();
      }
    },
    async register() {
      const newUser = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        password: this.password,
      };
      const statusCode = await this.$store.dispatch("register", { newUser });
      if (statusCode === 409) {
        this.registerError = false;
        this.userNameTaken = true;
      } else if (statusCode === 200) {
        this.userNameTaken = false;
        this.registerError = false;
        const username = newUser.username;
        const password = newUser.password;
        const success = await this.$store.dispatch("login", {
          username,
          password,
        });
        if (success) {
          this.$router.push("/events");
        }
      } else {
        this.userNameTaken = false;
        this.registerError = true;
      }
    },
  },
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
  background-color: rgb(46, 46, 46);
  color: white;
  font-weight: bold;
}
.errorMsg {
  color: rgb(197, 12, 12);
}
</style>
