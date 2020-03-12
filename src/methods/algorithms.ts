import { IProcess } from "@/store/models.interface";

export interface IAnimationInfo {
  animationFinishHandler: () => any;
  processes: IProcess[];
  animationSpeed: number;
}

const isEveryProcessFinished = (processes: IProcess[]) => {
  return processes.every(process => {
    return process.timeLeft === 0;
  });
};

export const animatedFcfs = (
  info: IAnimationInfo,
  i = 0,
  skipNextTimeout = false
) => {
  if (isEveryProcessFinished(info.processes)) {
    info.animationFinishHandler();
    return;
  }

  setTimeout(
    () => {
      const { length } = info.processes;

      const currentProcess = info.processes[i % length];

      if (currentProcess.timeLeft >= 1) {
        info.processes[i % length].timeLeft += -1;

        let nextIndex = i;
        if (currentProcess.timeLeft === 0) {
          nextIndex++;
        }
        requestAnimationFrame(() => animatedFcfs(info, nextIndex % length));
      } else {
        requestAnimationFrame(() => animatedFcfs(info, i + 1, true));
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / info.animationSpeed)
  );
};

const getShortestProcess = (processes: IProcess[]) => {
  const sortedUnfinished = [...processes]
    .sort((a, b) => {
      return a.timeLeft - b.timeLeft;
    })
    .filter(process => {
      return process.timeLeft !== 0;
    });
  return sortedUnfinished[0] || null;
};

const getIndexOfShortest = (processes: IProcess[]) => {
  return processes.indexOf(getShortestProcess(processes));
};

export const animatedSjf = (
  info: IAnimationInfo,
  i = getIndexOfShortest(info.processes),
  skipNextTimeout = false
) => {
  setTimeout(
    () => {
      const { length } = info.processes;

      // don't stop until finished
      const currentProcess = info.processes[i % length];

      if (currentProcess === null || currentProcess === undefined) {
        info.animationFinishHandler();
        return;
      }

      if (currentProcess.timeLeft >= 1) {
        currentProcess.timeLeft += -1;

        let nextIndex = i;
        if (currentProcess.timeLeft === 0) {
          nextIndex = info.processes.indexOf(
            getShortestProcess(info.processes)
          );
        }
        requestAnimationFrame(() => animatedSjf(info, nextIndex % length));
      } else {
        requestAnimationFrame(() => animatedSjf(info, i + 1, true));
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / info.animationSpeed)
  );
};

export const animatedPsjf = (
  info: IAnimationInfo,
  i = getIndexOfShortest(info.processes),
  skipNextTimeout = false
) => {
  setTimeout(
    () => {
      const { length } = info.processes;

      const currentProcess = getShortestProcess(info.processes);

      if (currentProcess === null) {
        info.animationFinishHandler();
        return;
      }

      if (currentProcess.timeLeft >= 1) {
        currentProcess.timeLeft += -1;

        let nextIndex = i;
        if (currentProcess.timeLeft === 0) {
          nextIndex++;
        }
        requestAnimationFrame(() => animatedPsjf(info, nextIndex % length));
      } else {
        requestAnimationFrame(() => animatedPsjf(info, i + 1, true));
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / info.animationSpeed)
  );
};

export const animatedRot = (
  info: IAnimationInfo,
  i = 0,
  skipNextTimeout = false
) => {
  if (isEveryProcessFinished(info.processes)) {
    info.animationFinishHandler();
    return;
  }

  setTimeout(
    () => {
      const { length } = info.processes;

      const currentProcess = info.processes[i % length];

      if (currentProcess.timeLeft >= 1) {
        info.processes[i % length].timeLeft += -1;
        requestAnimationFrame(() => animatedRot(info, i + 1));
      } else {
        requestAnimationFrame(() => animatedRot(info, i + 1, true));
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / info.animationSpeed)
  );
};
