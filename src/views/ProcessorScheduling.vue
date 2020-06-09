<template>
  <div class="processor-scheduling">
    <div class="main-view">
      <AxisDescription
        x-axis-description="Order of the processes"
        y-axis-description="Time needed"
      />
      <InfoBox title="Process View">
        <Processes :processes="state.processes" />
      </InfoBox>
    </div>
    <InfoBox title="Actions">
      <ActionSelect
        :numberOfProcesses="state.numberOfProcesses"
        :animationSpeed="state.animationSpeed"
        :timeQuantum="state.timeQuantum"
        :isAnimationRunning="state.isAnimationRunning"
        :selectedAlgorithm="state.selectedAlgorithm"
        @onChangeProcessNumbers="onChangeProcessNumbers"
        @onChangeAnimationSpeed="onChangeAnimationSpeed"
        @onChangeTimeQuantum="onChangeTimeQuantum"
        @onGenerateRandomButton="onGenerateRandomButton"
      />
    </InfoBox>
    <InfoBox title="Algorithms">
      <AlgorithmSelect
        :isAnimationRunning="state.isAnimationRunning"
        @onRunAlgorithm="onRunAlgorithm"
        @onAlgorithmSelect="onAlgorithmSelect"
        @onReset="onReset"
      />
    </InfoBox>
    <InfoBox title="Precalculated statistics">
      <div class="statistics">
        <span>Average waiting time</span>
        <span>{{ avgWaitingTime }}</span>
        <span v-if="isRotSelected">Time window</span>
        <span v-if="isRotSelected">{{ state.timeQuantum }}</span>
      </div>
    </InfoBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  IProcess,
  Algorithm
} from "../store/processor-scheduling/models.interface";
import { generateRandomProcess } from "../methods/processor-scheduling/process";
import {
  executeSelectedAlgorithm,
  getAvgWaitingTime
} from "../methods/processor-scheduling/algorithms";
import InfoBox from "../components/InfoBox.vue";
import Processes from "../components/Processes.vue";
import AlgorithmSelect from "../components/AlgorithmSelect.vue";
import ActionSelect from "../components/ActionSelect.vue";
import AxisDescription from "../components/AxisDescription.vue";
import store from "../store/processor-scheduling/index";

@Component({
  components: {
    InfoBox,
    Processes,
    AlgorithmSelect,
    ActionSelect,
    AxisDescription
  }
})
export default class ProcessorScheduling extends Vue {
  private mounted() {
    this.onGenerateRandomButton();
  }

  public get state() {
    return store.state;
  }

  public onChangeProcessNumbers(change: number) {
    store.commit("incrementProcessCount", { amount: change });
    store.commit("updateInitialProcesses");
  }

  public onChangeAnimationSpeed(change: number) {
    store.commit("incrementAnimationSpeed", { amount: change });
  }

  public onChangeTimeQuantum(change: number) {
    store.commit("incrementTimeQuantum", { amount: change });
  }

  public onGenerateRandomButton() {
    store.commit("randomizeProcesses");
  }

  public onRunAlgorithm(alg: Algorithm) {
    this.executeSelectedAlgorithm();
  }

  public onAlgorithmSelect(id: number) {
    store.commit("selectAlgorithm", { id });
  }

  public onReset() {
    store.commit("restoreInitialProcesses");
    store.commit("changeAnimationState", { change: false });

    // the animation is still running for one cycle, reset the processes again
    setTimeout(() => {
      store.commit("restoreInitialProcesses");
    }, 1000 * (1 / store.state.animationSpeed));
  }

  public get isRotSelected() {
    return store.state.selectedAlgorithm === Algorithm.rot;
  }

  public executeSelectedAlgorithm() {
    store.commit("changeAnimationState", { change: true });
    executeSelectedAlgorithm();
  }

  public get avgWaitingTime() {
    return getAvgWaitingTime();
  }
}
</script>

<style lang="scss">
div.processor-scheduling {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: min-content;
  gap: 80px 40px;

  div.main-view {
    grid-column: span 3;
    & > div {
      justify-content: center;
      display: flex;
    }
    position: relative;
  }

  div.info-box {
    height: 100%;
  }

  div.statistics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: min-content;
    align-items: center;
    text-align: left;

    & > span:nth-child(even) {
      text-align: center;
    }

    & > span:nth-child(odd) {
      margin: 6px 0;
    }
  }
}
</style>
