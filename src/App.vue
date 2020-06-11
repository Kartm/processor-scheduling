<template>
  <div id="app">
    <section class="container">
      <keep-alive>
        <ProcessorScheduling />
      </keep-alive>
    </section>
    <footer>
      <span>icon by Becris</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ProcessorScheduling from "./views/ProcessorScheduling.vue";

@Component({ components: { ProcessorScheduling } })
export default class App extends Vue {}
</script>

<style lang="scss">
$verticalMargin: 90px;
body {
  margin: 0;
  height: 100vh;
}

#app {
  font-family: Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 768px;
  max-height: 90vh;
  margin: $verticalMargin auto;
}

footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: 12px;
}
</style>
