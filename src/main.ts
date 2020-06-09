import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueRouter from "vue-router";

// views
import Home from "../src/views/Home.vue";
import ProcessorScheduling from "../src/views/ProcessorScheduling.vue";
import DiskScheduling from "../src/views/DiskScheduling.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    // { path: "/", component: Home, name: "Home" },
    { path: "/", redirect: "processor-scheduling", meta: { hidden: true } },
    {
      path: "/processor-scheduling",
      component: ProcessorScheduling,
      name: "Processor scheduling"
    },
    {
      path: "/disk-scheduling",
      component: DiskScheduling,
      name: "Disk scheduling"
    },
    {
      path: "/page-replacement",
      component: Home,
      name: "Page replacement"
    },
    {
      path: "/frame-allocation",
      component: Home,
      name: "Frame allocation"
    },
    {
      path: "/distributed-processor-scheduling",
      component: Home,
      name: "Distributed processor scheduling"
    }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
