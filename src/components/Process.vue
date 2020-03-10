<template>
  <div class="process" :style="{ minHeight: `${totalHeight}px` }">
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
    return this.process.usedTime * this.timeUnitToPixelRatio;
  }

  mounted() {
    console.log(this.process);
  }
}
</script>

<style scoped lang="scss">
div.process {
  width: 16px;
  background-color: #efefef;
  border: solid #3f3f3f 1px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  div.completedOverlay {
    width: 100%;
    background-color: green;
  }
}
</style>
