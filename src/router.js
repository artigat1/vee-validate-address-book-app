import Vue from "vue";
import Router from "vue-router";

import HomePage from "./views/Home.vue";
import ContactFormPage from "./views/contact-form.vue";

Vue.use(Router);
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomePage
    },
    {
      path: "/contact",
      name: "contact",
      component: ContactFormPage
    }
  ]
});
