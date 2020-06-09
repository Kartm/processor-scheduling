<template>
  <div class="wrapper">
    <div class="axis x">
      <span>{{xAxisDescription}}</span>
    </div>
    <div class="axis y">
      <span>{{yAxisDescription}}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class AxisDescription extends Vue {
  @Prop({ type: String, default: "" }) xAxisDescription!: string;
  @Prop({ type: String, default: "" }) yAxisDescription!: string;
}
</script>

<style lang="scss">
div.axis {
  position: absolute;
  font-size: 12px;

  &.x {
    left: 50%;
    transform: translateX(-50%);
    bottom: 6px;
  }
  &.y {
    left: 0;
    top: 50%;
    transform: translateY(-50%) translateX(calc(-50% + 14px)) rotate(-90deg);
  }
}
</style>
