import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login";
import Register from "./components/Register";
import EventList from "./components/EventList";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/register",
      component: Register,
    },
    {
      path: "/events",
      component: EventList,
    },
  ],
});
