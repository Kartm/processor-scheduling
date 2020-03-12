import Vue from "vue";
import Vuex from "vuex";
import { generateRandomProcess } from "@/methods/process";
import { IProcess, Algorithm } from "./models.interface";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialProcesses: [] as IProcess[],
    processes: [] as IProcess[],
    selectedAlgorithm: null as Algorithm | null,
    numberOfProcesses: 10,
    animationSpeed: 10,
    isAnimationRunning: false,
    timeWindow: 0
  },
  mutations: {
    incrementProcessCount(state, payload) {
      state.numberOfProcesses += payload.amount;
      if (payload.amount > 0) {
        state.processes.push(generateRandomProcess());
      } else {
        state.processes.pop();
      }
    },
    incrementAnimationSpeed(state, payload) {
      state.animationSpeed += payload.amount;
    },
    randomizeProcesses(state) {
      const generatedProcesses = [];
      for (let i = 0; i < state.numberOfProcesses; i++) {
        generatedProcesses.push(generateRandomProcess());
      }
      state.initialProcesses = generatedProcesses.map(process => ({
        ...process
      }));
      state.processes = [...generatedProcesses];
    },
    updateInitialProcesses(state) {
      state.initialProcesses = state.processes.map(process => ({ ...process }));
    },
    restoreInitialProcesses(state) {
      state.processes = state.initialProcesses.map(process => ({ ...process }));
    },
    selectAlgorithm(state, payload) {
      state.selectedAlgorithm = payload.id;
    },
    changeAnimationState(state, payload) {
      state.isAnimationRunning = payload.change;
    }
  },
  actions: {},
  modules: {}
});
