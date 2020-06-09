<template>
  <div class="processes">
    <div class="processes-wrapper">
      <Process v-for="(process, i) in processes" :key="i" :process="process" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { IProcess } from "../store/processor-scheduling/models.interface";
import Process from "./Process.vue";

@Component({
  components: {
    Process
  }
})
export default class Processes extends Vue {
  @Prop({
    type: Array as () => IProcess[],
    required: true
  })
  processes!: string;
}
</script>

<style scoped lang="scss">
div.processes {
  display: flex;
  justify-content: flex-end;
  min-height: calc(10px * 20 + 20px);
  div.processes-wrapper {
    display: flex;
    flex-direction: row;
    align-items: flex-end;

    div.process {
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
