import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";

// views
import Home from "../src/views/Home.vue";
import ProcessorScheduling from "../src/views/ProcessorScheduling.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/", component: Home, name: "Home" },
    {
      path: "/processor-scheduling",
      component: ProcessorScheduling,
      name: "Processor scheduling"
    }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
