<template>
  <div id="app">
    <TopNavigation />
    <section class="container">
      <router-view />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopNavigation, {
  NavigationOption
} from "./components/TopNavigation.vue";
import VueRouter from "vue-router";

const navigationOptions = [
  { text: "Home", targetRoute: "/" }
] as NavigationOption[];

@Component({
  components: {
    TopNavigation
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
$verticalMargin: 90px;
body {
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 768px;
  max-height: 90vh;
  margin: $verticalMargin auto;
}
</style>
