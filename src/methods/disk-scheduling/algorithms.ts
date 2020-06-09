import { ITask, Algorithm } from "@/store/disk-scheduling/models.interface";
import store from "@/store/disk-scheduling/index";

const isEveryProcessFinished = () => {
  return store.state.tasks.every(task => {
    return task.used == false;
  });
};

export const animatedFcfs = (i = 0, skipNextTimeout = false) => {
  if (isEveryProcessFinished()) {
    store.commit("changeAnimationState", { change: false });
    return;
  }

  if (store.state.isAnimationRunning) {
    setTimeout(
      () => {
        const { length } = store.state.tasks;

        const currentProcess = store.state.tasks[i % length];

        if (currentProcess.used === false) {
          store.state.tasks[i % length].used = true;

          let nextIndex = i;
          if (currentProcess.used === false) {
            nextIndex++;
          }
          requestAnimationFrame(() => animatedFcfs(nextIndex % length));
        } else {
          requestAnimationFrame(() => animatedFcfs(i + 1, true));
        }
      },
      skipNextTimeout ? 0 : 1000 * (1 / store.state.animationSpeed)
    );
  }
};

const getShortestTask = () => {
  const sortedUnfinished = [...store.state.tasks]
    .sort((a, b) => {
      return a.deadline - b.deadline;
    })
    .filter(process => {
      return process.deadline !== 0;
    });
  return sortedUnfinished[0] || null;
};

const getIndexOfShortest = () => {
  return store.state.tasks.indexOf(getShortestTask());
};

const roundTwoDecimals = (x: number) => {
  return Math.round(x * 100) / 100;
};

export const averageWaitingTimeFcfs = () => {
  const { tasks } = store.state;
  let accelerator = 0;

  for (let i = 0; i < store.state.tasks.length - 1; i++) {
    accelerator += accelerator + store.state.tasks[i].deadline;
  }

  const avg = accelerator / store.state.tasks.length;
  return roundTwoDecimals(avg);
};

export const executeSelectedAlgorithm = () => {
  switch (+(store.state.selectedAlgorithm as Algorithm)) {
    case Algorithm.fcfs: {
      animatedFcfs();
      break;
    }
    default: {
      break;
    }
  }
};

export const getAvgWaitingTime = () => {
  switch (+(store.state.selectedAlgorithm as Algorithm)) {
    case Algorithm.fcfs: {
      return averageWaitingTimeFcfs();
    }
    default: {
      return "?";
    }
  }
};
