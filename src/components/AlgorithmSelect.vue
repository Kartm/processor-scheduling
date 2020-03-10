<template>
  <form class="algorithms" @submit.prevent="onRunAlgorithm">
    <input type="radio" id="fcfs" name="algorithm" value="0" checked />
    <label for="fcfs">FCFS</label><br />
    <input type="radio" id="sjf" name="algorithm" value="1" />
    <label for="sjf">SJF</label><br />
    <input type="radio" id="psjf" name="algorithm" value="2" />
    <label for="psjf">preemptive SJF</label><br />
    <input type="radio" id="rot" name="algorithm" value="3" />
    <label for="other">ROT</label><br />
    <button type="submit">Run</button>
    <div><button disabled>Pause</button> <button disabled>Stop</button></div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Algorithm } from "../store/models.interface";

@Component
export default class AlgorithmSelect extends Vue {
  public onRunAlgorithm(e: Event) {
    const { value } = (e.target as any).elements.algorithm;
    if (value.length > 0) {
      this.$emit("onRunAlgorithm", value as Algorithm);
    }
  }
}
</script>

<style lang="scss">
form.algorithms {
  margin: auto;
  text-align: left;
  input,
  label {
    margin: 4px 0;
  }

  label {
    margin-left: 4px;
  }
  button {
    display: block;
    margin: auto;
    margin-top: 10px;
  }
}
</style>
