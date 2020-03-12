<template>
  <div class="actions">
    <label>Animation speed</label>
    <span class="option">
      <button
        @click="
          () => {
            onChangeAnimationSpeed(-1);
          }
        "
        class="modify decrease"
      >
        -1
      </button>
      <span class="process-count-number">{{ animationSpeed }}</span>
      <button
        @click="
          () => {
            onChangeAnimationSpeed(1);
          }
        "
        class="modify increase"
      >
        +1
      </button>
    </span>
    <hr />
    <label>Process count</label>
    <span class="option">
      <button
        @click="
          () => {
            onChangeProcessNumbers(-1);
          }
        "
        class="modify decrease"
      >
        -1
      </button>
      <span class="process-count-number">{{ numberOfProcesses }}</span>
      <button
        @click="
          () => {
            onChangeProcessNumbers(1);
          }
        "
        class="modify increase"
      >
        +1
      </button>
    </span>
    <hr />
    <label :style="[isRotSelected ? {} : { visibility: 'hidden' }]"
      >Time window</label
    >
    <span
      class="option"
      :style="[isRotSelected ? {} : { visibility: 'hidden' }]"
    >
      <button
        @click="
          () => {
            onChangeTimeQuantum(-1);
          }
        "
        class="modify decrease"
      >
        -1
      </button>
      <span class="process-count-number">{{ timeQuantum }}</span>
      <button
        @click="
          () => {
            onChangeTimeQuantum(1);
          }
        "
        class="modify increase"
      >
        +1
      </button>
    </span>
    <hr />
    <button
      :disabled="isAnimationRunning"
      class="randomize"
      @click="onGenerateRandomButton"
    >
      Randomize processes
    </button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IProcess, Algorithm } from "../store/models.interface";

@Component
export default class ActionSelect extends Vue {
  @Prop({ type: Number, required: true }) numberOfProcesses!: number;
  @Prop({ type: Number, required: true }) animationSpeed!: number;
  @Prop({ type: Number, required: true }) timeQuantum!: number;
  @Prop({ type: Number, required: true }) selectedAlgorithm!: number;
  @Prop({ required: true, type: Boolean }) isAnimationRunning!: boolean;

  private mounted() {
    this.onGenerateRandomButton();
  }

  public onChangeProcessNumbers(change: number) {
    this.$emit("onChangeProcessNumbers", change);
  }

  public onChangeAnimationSpeed(change: number) {
    this.$emit("onChangeAnimationSpeed", change);
  }

  public onChangeTimeQuantum(change: number) {
    this.$emit("onChangeTimeQuantum", change);
  }

  public onGenerateRandomButton() {
    this.$emit("onGenerateRandomButton", null);
  }

  public get isRotSelected() {
    return this.selectedAlgorithm === Algorithm.rot;
  }
}
</script>

<style lang="scss">
div.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin: auto;

  label {
    font-size: 14px;
    margin-bottom: 4px;
  }

  button {
    cursor: pointer;
  }

  span.process-count-number {
    display: inline-block;
    font-size: 12px;
    width: 40px;
    opacity: 0.6;
  }

  button.generate:not(:first) {
    margin-top: 10px;
  }
}
</style>
