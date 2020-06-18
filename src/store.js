import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
const baseURL = process.env.VUE_APP_API_BASE_URL;

export default new Vuex.Store({
  state: {
    loggedIn: false,
    username: null,
    userId: null,
    firstName: null,
    lastName: null,
    eventList: [],
  },
  mutations: {
    setLoggedIn(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    setUsername(state, username) {
      state.username = username;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setFirstName(state, firstName) {
      state.firstName = firstName;
    },
    setLastName(state, lastName) {
      state.lastName = lastName;
    },
    setEventList(state, eventList) {
      state.eventList = eventList;
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        console.log(credentials);
        const username = credentials.username;
        const pass = credentials.password;
        const rawUser = await axios.get(`${baseURL}/users/${username}/`);
        const user = await rawUser.data[0];
        console.log("in store login", user.password, pass);
        if (user.password === pass) {
          console.log("before commit");
          commit("setLoggedIn", true);
          commit("setUsername", user.username);
          commit("setUserId", user.user_id);
          commit("setFirstName", user.first_name);
          commit("setLastName", user.last_name);
          console.log("completed commits", this.state.loggedIn);
          console.log("completed commits", this.state.userId);
        } else {
          console.error("Password incorrect");
        }
      } catch (err) {
        console.error("Error logging in", err);
      }
    },
    logout({ commit }) {
      commit("setLoggedIn", false);
      commit("setUsername", null);
      commit("setUserId", null);
      commit("setFirstName", null);
      commit("setLastName", null);
    },
  },
});
