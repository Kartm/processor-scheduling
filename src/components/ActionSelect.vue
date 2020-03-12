<template>
  <div class="actions">
    <label>Animation speed</label>
    <span class="option">
      <button
        :disabled="isAnimationRunning"
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
        :disabled="isAnimationRunning"
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

const limits = {
  minProcessNumber: 1,
  maxProcessNumber: 26,
  minAnimationSpeed: 1,
  maxAnimationSpeed: 20
};

@Component
export default class ActionSelect extends Vue {
  @Prop({ type: Number, required: true }) numberOfProcesses!: number;
  @Prop({ type: Number, required: true }) animationSpeed!: number;
  @Prop({ required: true, type: Boolean }) isAnimationRunning!: boolean;

  private mounted() {
    this.onGenerateRandomButton();
  }

  public onChangeProcessNumbers(change: number) {
    if (
      this.numberOfProcesses < limits.maxProcessNumber &&
      this.numberOfProcesses > limits.minProcessNumber
    ) {
      this.$emit("onChangeProcessNumbers", change);
    }
  }

  public onChangeAnimationSpeed(change: number) {
    if (
      this.animationSpeed < limits.maxAnimationSpeed &&
      this.animationSpeed > limits.minAnimationSpeed
    ) {
      this.$emit("onChangeAnimationSpeed", change);
    }
  }

  public onGenerateRandomButton() {
    this.$emit("onGenerateRandomButton", null);
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
