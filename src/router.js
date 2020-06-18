import Vue from "vue";
import VueRouter from "vue-router";
import Login from "./components/Login";
import Register from "./components/Register";

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
  ],
});
