<template>
  <div id="app">
    <div class="main-view">
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
import { IProcess, Algorithm } from "./store/models.interface";
import { generateRandomProcess } from "./methods/process";
import {
  executeSelectedAlgorithm,
  getAvgWaitingTime
} from "./methods/algorithms";
import InfoBox from "./components/InfoBox.vue";
import Processes from "./components/Processes.vue";
import AlgorithmSelect from "./components/AlgorithmSelect.vue";
import ActionSelect from "./components/ActionSelect.vue";
import store from "./store/index";

@Component({
  components: {
    InfoBox,
    Processes,
    AlgorithmSelect,
    ActionSelect
  }
})
export default class App extends Vue {
  private mounted() {
    this.onGenerateRandomButton();
  }

  public onChangeProcessNumbers(change: number) {
    store.commit("incrementProcessCount", { amount: change });
    store.commit("updateInitialProcesses");
  }

  public get state() {
    return store.state;
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
$verticalMargin: 60px;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  max-width: 768px;
  max-height: calc(100vh - 2 * #{$verticalMargin});
  margin: $verticalMargin auto;

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
      padding: 10px 0;
    }
  }
}
</style>
