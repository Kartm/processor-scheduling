<template>
  <div id="app">
    <div class="main-view">
      <InfoBox title="Process View">
        <Processes :processes="processes" />
      </InfoBox>
    </div>
    <InfoBox title="Actions">
      <div class="actions">
        <span>
          <button
            @click="
              () => {
                onChangeProcessNumbers(-1);
              }
            "
            class="modify-decrease"
          >
            -1
          </button>
          <button
            @click="
              () => {
                onChangeProcessNumbers(1);
              }
            "
            class="modify-increase"
          >
            +1
          </button>
        </span>
        <button class="randomize" @click="onGenerateRandomButton">
          Randomize processes
        </button>
      </div>
    </InfoBox>
    <InfoBox title="Algorithms">
      <form class="algorithms" @submit.prevent="onStartButton">
        <input type="radio" id="fcfs" name="algorithm" value="0" />
        <label for="fcfs">FCFS</label><br />
        <input type="radio" id="sjf" name="algorithm" value="1" />
        <label for="sjf">SJF</label><br />
        <input type="radio" id="psjf" name="algorithm" value="2" />
        <label for="psjf">preemptive SJF</label><br />
        <input type="radio" id="rot" name="algorithm" value="3" />
        <label for="other">ROT</label><br />
        <button type="submit">Run</button>
      </form>
    </InfoBox>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProcess, Algorithm } from "./store/models.interface";
import InfoBox from "./components/InfoBox.vue";
import Processes from "./components/Processes.vue";

@Component({
  components: {
    InfoBox,
    Processes
  }
})
export default class App extends Vue {
  public processes: IProcess[] = [];

  public numberOfProcesses = 10;

  private mounted() {
    this.onGenerateRandomButton();
  }

  public onChangeProcessNumbers(change: number) {
    console.log(change);
    if (change > 0 && this.numberOfProcesses < 26) {
      this.numberOfProcesses += change;
      this.processes.push(this.generateRandomProcess());
    } else if (change < 0 && this.numberOfProcesses > 1) {
      this.numberOfProcesses += change;
      this.processes.pop();
    }
  }

  public onGenerateRandomButton() {
    const generatedProcesses = [];
    for (let i = 0; i < this.numberOfProcesses; i++) {
      generatedProcesses.push(this.generateRandomProcess());
    }
    this.processes = generatedProcesses;
  }

  public generateRandomProcess() {
    return {
      id: `asdasdasdasdasd`,
      neededTime: Math.floor(Math.random() * 10) + 1,
      usedTime: Math.floor(Math.random() * 4) + 1,
      totalWaitingTime: 0
    } as IProcess;
  }

  public onStartButton(e: Event) {
    const { value } = (e.target as any).elements.algorithm;
    if (value.length > 0) {
      this.executeAlgorithm(value as Algorithm);
    }
  }

  private animatedFcfs(i: number) {
    setTimeout(() => {
      if (true) {
        const { length } = this.processes;
        this.processes[i % length].usedTime += -1;
      }

      // todo draw progress line

      // is next process finished

      requestAnimationFrame(() => this.animatedFcfs(i + 1));
    }, 250);
  }

  public executeAlgorithm(alg: Algorithm) {
    switch (+alg) {
      // first come first serve
      case Algorithm.fcfs: {
        console.log("fcfs start");

        const animationDelay = 250;
        const running = true;
        const cpuSingleWork = 10;

        this.animatedFcfs(0);
        break;
      }
      default: {
        console.log("default");
        break;
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
  gap: 20px;

  div.main-view {
    grid-column: span 3;
    & > div {
      width: 100%;
      justify-content: center;
      display: flex;
    }
  }

  form.algorithms {
    margin-top: 10px;
    text-align: left;
    input,
    label {
      margin: 4px 0;
    }

    label {
      margin-left: 4px;
    }
    button {
      display: block;
      margin: auto;
      margin-top: 10px;
    }
  }

  div.actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    height: 100%;
    button.randomize {
    }

    button.reset {
      margin-top: 10px;
    }
  }
}
</style>
