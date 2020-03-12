<template>
  <div id="app">
    <div class="main-view">
      <InfoBox title="Process View">
        <Processes :processes="processes" />
      </InfoBox>
    </div>
    <InfoBox title="Actions">
      <ActionSelect
        :numberOfProcesses="numberOfProcesses"
        :animationSpeed="animationSpeed"
        :isAnimationRunning="isAnimationRunning"
        @onChangeProcessNumbers="onChangeProcessNumbers"
        @onChangeAnimationSpeed="onChangeAnimationSpeed"
        @onGenerateRandomButton="onGenerateRandomButton"
      />
    </InfoBox>
    <InfoBox title="Algorithms">
      <AlgorithmSelect
        :isAnimationRunning="isAnimationRunning"
        @onRunAlgorithm="onRunAlgorithm"
        @onAlgorithmSelect="onAlgorithmSelect"
        @onReset="onReset"
      />
    </InfoBox>
    <InfoBox title="Precalculated statistics">
      <div class="statistics">
        <span>Average waiting time</span>
        <span>{{ averageWaitingTime }}</span>
        <span v-if="isRotSelected">Time window</span>
        <span v-if="isRotSelected">{{ timeWindow }}</span>
      </div>
    </InfoBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProcess, Algorithm } from "./store/models.interface";
import { generateRandomProcess } from "./methods/process";
import {
  IAnimationInfo,
  animatedFcfs,
  animatedSjf,
  animatedPsjf,
  animatedRot,
  averageWaitingTimeFcfs,
  averageWaitingTimeSjf,
  averageWaitingTimePsjf,
  averageWaitingTimeRot
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
  public initialProcesses: IProcess[] = [];

  public processes: IProcess[] = [];
  public selectedAlgorithm: Algorithm | null = null;

  public numberOfProcesses = 10;
  public animationSpeed = 10;
  public isAnimationRunning = false;

  public timeWindow = 0;

  private mounted() {
    this.onGenerateRandomButton();
  }

  public onChangeProcessNumbers(change: number) {
    if (change > 0) {
      this.numberOfProcesses += change;
      this.processes.push(generateRandomProcess());
    } else if (change < 0) {
      this.numberOfProcesses += change;
      this.processes.pop();
    }
    this.initialProcesses = this.processes.map(process => ({ ...process }));
  }

  public onChangeAnimationSpeed(change: number) {
    this.animationSpeed += change;
  }

  public onGenerateRandomButton() {
    const generatedProcesses = [];
    for (let i = 0; i < this.numberOfProcesses; i++) {
      generatedProcesses.push(generateRandomProcess());
    }
    this.initialProcesses = generatedProcesses.map(process => ({ ...process }));
    this.processes = [...generatedProcesses];
  }

  public onRunAlgorithm(alg: Algorithm) {
    this.executeSelectedAlgorithm();
  }

  public onAlgorithmSelect(id: number) {
    this.selectedAlgorithm = id;
  }

  public onReset() {
    this.processes = this.initialProcesses.map(process => ({ ...process }));
    this.animationFinishHandler();
  }

  private animationFinishHandler() {
    this.isAnimationRunning = false;
  }

  public get isRotSelected() {
    return this.selectedAlgorithm === Algorithm.rot;
  }

  public executeSelectedAlgorithm() {
    this.isAnimationRunning = true;

    const animationInfo = {
      animationFinishHandler: this.animationFinishHandler,
      processes: this.processes,
      animationSpeed: this.animationSpeed
    } as IAnimationInfo;
    switch (+(this.selectedAlgorithm as Algorithm)) {
      case Algorithm.fcfs: {
        animatedFcfs(animationInfo);
        break;
      }
      case Algorithm.sjf: {
        animatedSjf(animationInfo);
        break;
      }
      case Algorithm.psjf: {
        animatedPsjf(animationInfo);
        break;
      }
      case Algorithm.rot: {
        animatedRot(animationInfo);
        break;
      }
      default: {
        break;
      }
    }
  }

  public get averageWaitingTime() {
    switch (+(this.selectedAlgorithm as Algorithm)) {
      case Algorithm.fcfs: {
        return averageWaitingTimeFcfs(this.processes);
      }
      case Algorithm.sjf: {
        return averageWaitingTimeSjf(this.processes);
      }
      case Algorithm.psjf: {
        return averageWaitingTimePsjf(this.processes);
      }
      case Algorithm.rot: {
        return averageWaitingTimeRot(this.processes);
      }
      default: {
        return "?";
      }
    }
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
  }
}
</style>
