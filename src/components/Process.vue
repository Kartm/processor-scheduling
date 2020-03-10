<template>
  <div
    class="process"
    :class="{ finished: isFinished }"
    :style="{ minHeight: `${totalHeight}px` }"
  >
    <div class="completedOverlay" :style="{ height: `${completedHeight}px` }" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IProcess } from "../store/models.interface";

@Component
export default class Process extends Vue {
  @Prop({
    type: Object as () => IProcess,
    required: true
  })
  process!: IProcess;

  // every time unit is displayed as 100px
  private timeUnitToPixelRatio = 20;

  public get totalHeight() {
    return this.process.neededTime * this.timeUnitToPixelRatio;
  }

  public get completedHeight() {
    return this.process.timeLeft * this.timeUnitToPixelRatio;
  }

  public get isFinished() {
    return this.process.timeLeft === 0;
  }
}
</script>

<style scoped lang="scss">
div.process {
  width: 16px;
  background-color: #d6d6d6;
  border: solid #3f3f3f 1px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  opacity: 0.8;

  &.finished {
    transition: opacity linear 0.25s;
    opacity: 0.4;
  }

  div.completedOverlay {
    width: 100%;
    background-color: rgba(9, 121, 9, 0.781);
  }
}
</style>
