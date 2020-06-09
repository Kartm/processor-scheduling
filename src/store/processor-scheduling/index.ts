import Vue from "vue";
import Vuex from "vuex";
import { generateRandomProcess } from "@/methods/processor-scheduling/process";
import { IProcess, Algorithm } from "./models.interface";

Vue.use(Vuex);

const limits = {
  minProcessNumber: 0,
  maxProcessNumber: 28,
  minAnimationSpeed: 1,
  maxAnimationSpeed: 30,
  minTimeQuantum: 1,
  maxTimeQuantum: 100
};

const defaultValues = {
  numberOfProcesses: Math.round(
    (limits.minProcessNumber + limits.maxProcessNumber) / 2
  ),
  animationSpeed: Math.round(
    (limits.minAnimationSpeed + limits.maxAnimationSpeed) / 2
  ),
  timeQuantum: 1
};

export default new Vuex.Store({
  state: {
    initialProcesses: [] as IProcess[],
    processes: [] as IProcess[],
    selectedAlgorithm: 0 as Algorithm | null,
    isAnimationRunning: false,
    numberOfProcesses: defaultValues.numberOfProcesses,
    animationSpeed: defaultValues.animationSpeed,
    timeQuantum: defaultValues.timeQuantum
  },
  mutations: {
    incrementProcessCount(state, payload) {
      const newNumberOfProcesses = state.numberOfProcesses + payload.amount;
      if (
        newNumberOfProcesses >= limits.minProcessNumber &&
        newNumberOfProcesses <= limits.maxProcessNumber
      ) {
        state.numberOfProcesses = newNumberOfProcesses;

        if (payload.amount > 0) {
          state.processes.push(generateRandomProcess());
        } else {
          state.processes.pop();
        }
      }
    },
    incrementAnimationSpeed(state, payload) {
      const newAnimationSpeed = state.animationSpeed + payload.amount;
      if (
        newAnimationSpeed >= limits.minAnimationSpeed &&
        newAnimationSpeed <= limits.maxAnimationSpeed
      ) {
        state.animationSpeed = newAnimationSpeed;
      }
    },
    incrementTimeQuantum(state, payload) {
      const newTimeQuantum = state.timeQuantum + payload.amount;
      if (
        newTimeQuantum >= limits.minTimeQuantum &&
        newTimeQuantum <= limits.maxTimeQuantum
      ) {
        state.timeQuantum = newTimeQuantum;
      }
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
      state.processes = [...state.initialProcesses].map(process => ({
        ...process,
        timeLeft: process.neededTime
      }));
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
