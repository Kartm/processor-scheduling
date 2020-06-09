import Vue from "vue";
import App from "./App.vue";
import store from "./store/processor-scheduling/index";
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
      name: "Disk scheduling",
      meta: { hidden: true }
    },
    {
      path: "/page-replacement",
      component: Home,
      name: "Page replacement",
      meta: { hidden: true }
    },
    {
      path: "/frame-allocation",
      component: Home,
      name: "Frame allocation",
      meta: { hidden: true }
    },
    {
      path: "/distributed-processor-scheduling",
      component: Home,
      name: "Distributed processor scheduling",
      meta: { hidden: true }
    }
  ]
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
