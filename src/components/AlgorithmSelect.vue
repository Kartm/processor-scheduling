<template>
  <form class="algorithms" @submit.prevent="onRunAlgorithm">
    <input
      @click="onAlgorithmSelect(0)"
      type="radio"
      id="fcfs"
      name="algorithm"
      value="0"
      checked
    />
    <label for="fcfs">FCFS</label><br />
    <input
      @click="onAlgorithmSelect(1)"
      type="radio"
      id="sjf"
      name="algorithm"
      value="1"
    />
    <label for="sjf">SJF</label><br />
    <input
      @click="onAlgorithmSelect(2)"
      type="radio"
      id="psjf"
      name="algorithm"
      value="2"
    />
    <label for="psjf">preemptive SJF</label><br />
    <input
      @click="onAlgorithmSelect(3)"
      type="radio"
      id="rot"
      name="algorithm"
      value="3"
    />
    <label for="rot">ROT</label><br />
    <button :disabled="isAnimationRunning" type="submit">Run</button>
    <div>
      <button type="button" @click="onReset">
        Reset
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Algorithm } from "../store/models.interface";

@Component
export default class AlgorithmSelect extends Vue {
  @Prop({ required: true, type: Boolean }) isAnimationRunning!: boolean;
  public onRunAlgorithm(e: Event) {
    const { value } = (e.target as any).elements.algorithm;
    if (value.length > 0) {
      this.$emit("onRunAlgorithm", value as Algorithm);
    }
  }

  public onReset() {
    this.$emit("onReset");
  }

  public onAlgorithmSelect(id: number) {
    this.$emit("onAlgorithmSelect", id);
  }
}
</script>

<style lang="scss">
form.algorithms {
  margin: auto;
  text-align: left;
  input,
  label {
    margin: 6px 0;
    cursor: pointer;
  }

  label {
    margin-left: 4px;
  }
  button {
    &:not(:disabled) {
      cursor: pointer;
    }
    display: block;
    margin: auto;
    margin-top: 10px;
  }
}
</style>
