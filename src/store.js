import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import persistedState from "vuex-persistedstate";

Vue.use(Vuex);
const baseURL = process.env.VUE_APP_API_BASE_URL;
console.log("baseURL", baseURL);

export default new Vuex.Store({
  plugins: [
    persistedState({
      storage: window.sessionStorage,
    }),
  ],
  state: {
    loggedIn: false,
    username: null,
    userId: null,
    firstName: null,
    lastName: null,
    eventList: [],
  },
  getters: {
    getLoggedIn(state) {
      return state.loggedIn;
    },
    getEventList(state) {
      return state.eventList;
    },
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
        const rawUser = await axios.get(`${baseURL}/api/users/${username}/`);
        const user = await rawUser.data[0];
        console.log("in store login", user.password, pass);
        if (user.password === pass) {
          console.log("before commit");
          commit("setLoggedIn", true);
          commit("setUsername", user.username);
          commit("setUserId", user.user_id);
          commit("setFirstName", user.first_name);
          commit("setLastName", user.last_name);
          return true;
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
    async register({ commit }, credentials) {
      try {
        const user = credentials.newUser;
        const newEntry = await axios.post(`${baseURL}/api/users/`, user);
        if (newEntry.data.rowCount > 0) {
          console.log("registered", user);
          commit("setLoggedIn", true);
          return true;
        }
      } catch (err) {
        console.error("Error creating new user", err);
      }
    },
    async retrieveEvents({ commit }) {
      try {
        if (this.state.userId !== null) {
          const userId = this.state.userId;
          let events = await axios.get(`${baseURL}/api/events/${userId}/`);
          let sorted = await events.data.sort((a, b) => {
            const aDate = new Date(a.date);
            const bDate = new Date(b.date);
            if (aDate === bDate) {
              return a.time - b.time;
            }
            return aDate - bDate;
          });
          console.log("retrieving store", sorted);
          commit("setEventList", sorted);
        }
      } catch (err) {
        console.error("Error retrieve event list", err);
      }
    },
    addEvent({ commit }, newEvent) {
      const updatedEventList = [...this.state.eventList, newEvent];
      commit("setEventList", updatedEventList);
      return updatedEventList;
    },
    removeEvent({ commit }, eventId) {
      const updatedEventList = [...this.state.eventList];
      updatedEventList.map((event, index) => {
        if (event.event_id === eventId) {
          updatedEventList.splice(index, 1);
          return;
        }
      });
      commit("setEventList", updatedEventList);
      return updatedEventList;
    },
  },
});
