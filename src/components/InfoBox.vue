<template>
  <div class="info-box">
    <span class="title">{{ title }}</span>
    <div class="content"><slot /></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class InfoBox extends Vue {
  @Prop({ type: String, required: true }) title!: string;
}
</script>

<style scoped lang="scss">
div.info-box {
  display: inline-block;
  position: relative;
  border: 1px #3f3f3f solid;
  box-sizing: content-box;
  padding: 10px;

  .title {
    position: absolute;
    left: 15px;
    top: -9px;
    display: inline-block;
    background-color: #fff;
    border-left: 5px solid #fff;
    border-right: 5px solid #fff;
    z-index: 10;
  }

  .content {
    display: flex;
    height: 100%;
  }
}
</style>
