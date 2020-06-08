<template>
  <div class="home">Various algorithms</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IProcess, Algorithm } from "../store/models.interface";
import { generateRandomProcess } from "../methods/process";
import {
  executeSelectedAlgorithm,
  getAvgWaitingTime
} from "../methods/algorithms";
import InfoBox from "../components/InfoBox.vue";
import Processes from "../components/Processes.vue";
import AlgorithmSelect from "../components/AlgorithmSelect.vue";
import ActionSelect from "../components/ActionSelect.vue";
import store from "../store/index";

@Component({
  components: {
    InfoBox,
    Processes,
    AlgorithmSelect,
    ActionSelect
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
div.home {
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  display: flex;
}
</style>
