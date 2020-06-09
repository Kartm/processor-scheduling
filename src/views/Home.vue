<template>
  <div class="home">
    <h3>Various algorithms</h3>icon by Becris
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {}
</script>

<style lang="scss">
div.home {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  display: flex;
}
</style>
