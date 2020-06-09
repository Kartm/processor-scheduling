import Vue from "vue";
import Vuex from "vuex";
import { generateRandomTask } from "@/methods/disk-scheduling/task";
import { ITask, Algorithm } from "./models.interface";

Vue.use(Vuex);

const limits = {
  minTaskNumber: 0,
  maxTaskNumber: 28,
  minAnimationSpeed: 1,
  maxAnimationSpeed: 30
};

const defaultValues = {
  numberOfTasks: Math.round((limits.minTaskNumber + limits.maxTaskNumber) / 2),
  animationSpeed: Math.round(
    (limits.minAnimationSpeed + limits.maxAnimationSpeed) / 2
  )
};

export default new Vuex.Store({
  state: {
    initialTasks: [] as ITask[],
    tasks: [] as ITask[],
    selectedAlgorithm: 0 as Algorithm | null,
    isAnimationRunning: false,
    numberOfTasks: defaultValues.numberOfTasks,
    animationSpeed: defaultValues.animationSpeed
  },
  mutations: {
    incrementProcessCount(state, payload) {
      const newNumberOfProcesses = state.numberOfTasks + payload.amount;
      if (
        newNumberOfProcesses >= limits.minTaskNumber &&
        newNumberOfProcesses <= limits.maxTaskNumber
      ) {
        state.numberOfTasks = newNumberOfProcesses;

        if (payload.amount > 0) {
          state.tasks.push(generateRandomTask());
        } else {
          state.tasks.pop();
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
    randomizeProcesses(state) {
      const generatedProcesses = [];
      for (let i = 0; i < state.numberOfTasks; i++) {
        generatedProcesses.push(generateRandomTask());
      }
      state.initialTasks = generatedProcesses.map(process => ({
        ...process
      }));
      state.tasks = [...generatedProcesses];
    },
    updateInitialProcesses(state) {
      state.initialTasks = state.tasks.map(process => ({ ...process }));
    },
    restoreInitialProcesses(state) {
      state.tasks = [...state.initialTasks].map(process => ({
        ...process
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
