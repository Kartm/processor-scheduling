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
        @onChangeProcessNumbers="onChangeProcessNumbers"
        @onChangeAnimationSpeed="onChangeAnimationSpeed"
        @onGenerateRandomButton="onGenerateRandomButton"
      />
    </InfoBox>
    <InfoBox title="Algorithms">
      <AlgorithmSelect @onRunAlgorithm="onSelectAlgorithm" />
    </InfoBox>
    <InfoBox title="Statistics">
      <div class="statistics">
        <span>Precalculated avg waiting time</span>
        <span>{{ averageWaitingTime }}</span>
      </div>
    </InfoBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProcess, Algorithm } from "./store/models.interface";
import { averageWaitingTimeFcfs } from "./methods/process";
import InfoBox from "./components/InfoBox.vue";
import Processes from "./components/Processes.vue";
import AlgorithmSelect from "./components/AlgorithmSelect.vue";
import ActionSelect from "./components/ActionSelect.vue";

@Component({
  components: {
    InfoBox,
    Processes,
    AlgorithmSelect,
    ActionSelect
  }
})
export default class App extends Vue {
  public processes: IProcess[] = [];
  public selectedAlgorithm: Algorithm | null = null;

  public numberOfProcesses = 10;
  public animationSpeed = 4;
  public isAnimationRunning = false;

  private mounted() {
    this.onGenerateRandomButton();
  }

  public onChangeProcessNumbers(change: number) {
    if (change > 0) {
      this.numberOfProcesses += change;
      this.processes.push(this.generateRandomProcess());
    } else if (change < 0) {
      this.numberOfProcesses += change;
      this.processes.pop();
    }
  }

  public onChangeAnimationSpeed(change: number) {
    this.animationSpeed += change;
  }

  public onGenerateRandomButton() {
    const generatedProcesses = [];
    for (let i = 0; i < this.numberOfProcesses; i++) {
      generatedProcesses.push(this.generateRandomProcess());
    }
    this.processes = generatedProcesses;
  }

  public generateRandomProcess() {
    const randomTime = Math.floor(Math.random() * 10) + 1;
    return {
      id: `asdasdasdasdasd`,
      neededTime: randomTime,
      timeLeft: randomTime,
      totalWaitingTime: 0
    } as IProcess;
  }

  private animatedFcfs(i = 0, skipNextTimeout = false) {
    setTimeout(
      () => {
        const { length } = this.processes;

        const currentProcess = this.processes[i % length];

        if (this.isAnimationRunning) {
          if (currentProcess.timeLeft >= 1) {
            this.processes[i % length].timeLeft += -1;

            let nextIndex = i;
            if (currentProcess.timeLeft === 0) {
              nextIndex++;
            }
            requestAnimationFrame(() => this.animatedFcfs(nextIndex % length));
          } else {
            requestAnimationFrame(() => this.animatedFcfs(i + 1, true));
          }
        }
      },
      skipNextTimeout ? 0 : 1000 * (1 / this.animationSpeed)
    );
  }

  private animatedRot(i = 0, skipNextTimeout = false) {
    setTimeout(
      () => {
        const { length } = this.processes;

        const currentProcess = this.processes[i % length];

        if (this.isAnimationRunning) {
          if (currentProcess.timeLeft >= 1) {
            this.processes[i % length].timeLeft += -1;
            requestAnimationFrame(() => this.animatedRot(i + 1));
          } else {
            requestAnimationFrame(() => this.animatedRot(i + 1, true));
          }
        }
      },
      skipNextTimeout ? 0 : 1000 * (1 / this.animationSpeed)
    );
  }

  public onSelectAlgorithm(alg: Algorithm) {
    this.selectedAlgorithm = alg;
    this.executeSelectedAlgorithm();
  }

  public executeSelectedAlgorithm() {
    this.isAnimationRunning = true;
    switch (+(this.selectedAlgorithm as Algorithm)) {
      // first come first serve
      case Algorithm.fcfs: {
        this.animatedFcfs();
        break;
      }
      case Algorithm.rot: {
        this.animatedRot();
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
