import { IProcess } from "@/store/models.interface";
export const animatedFcfs = (
  processes: IProcess[],
  isAnimationRunning: boolean,
  animationSpeed: number,
  i = 0,
  skipNextTimeout = false
) => {
  setTimeout(
    () => {
      const { length } = processes;

      const currentProcess = processes[i % length];

      if (isAnimationRunning) {
        if (currentProcess.timeLeft >= 1) {
          processes[i % length].timeLeft += -1;

          let nextIndex = i;
          if (currentProcess.timeLeft === 0) {
            nextIndex++;
          }
          requestAnimationFrame(() =>
            animatedFcfs(
              processes,
              isAnimationRunning,
              animationSpeed,
              nextIndex % length
            )
          );
        } else {
          requestAnimationFrame(() =>
            animatedFcfs(
              processes,
              isAnimationRunning,
              animationSpeed,
              i + 1,
              true
            )
          );
        }
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / animationSpeed)
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
  processes: IProcess[],
  isAnimationRunning: boolean,
  animationSpeed: number,
  i = getIndexOfShortest(processes),
  skipNextTimeout = false
) => {
  setTimeout(
    () => {
      const { length } = processes;

      // don't stop until finished

      const currentProcess = processes[i % length];
      // const currentProcess = getShortestProcess(processes);

      if (currentProcess === null) {
        isAnimationRunning = false;
      }

      if (isAnimationRunning) {
        if (currentProcess.timeLeft >= 1) {
          currentProcess.timeLeft += -1;

          let nextIndex = i;
          if (currentProcess.timeLeft === 0) {
            nextIndex = processes.indexOf(getShortestProcess(processes));
          }
          requestAnimationFrame(() =>
            animatedSjf(
              processes,
              isAnimationRunning,
              animationSpeed,
              nextIndex % length
            )
          );
        } else {
          requestAnimationFrame(() =>
            animatedSjf(
              processes,
              isAnimationRunning,
              animationSpeed,
              i + 1,
              true
            )
          );
        }
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / animationSpeed)
  );
};

export const animatedPsjf = (
  processes: IProcess[],
  isAnimationRunning: boolean,
  animationSpeed: number,
  i = getIndexOfShortest(processes),
  skipNextTimeout = false
) => {
  setTimeout(
    () => {
      const { length } = processes;

      const currentProcess = getShortestProcess(processes);

      if (currentProcess === null) {
        isAnimationRunning = false;
      }

      if (isAnimationRunning) {
        if (currentProcess.timeLeft >= 1) {
          currentProcess.timeLeft += -1;

          let nextIndex = i;
          if (currentProcess.timeLeft === 0) {
            nextIndex++;
          }
          requestAnimationFrame(() =>
            animatedPsjf(
              processes,
              isAnimationRunning,
              animationSpeed,
              nextIndex % length
            )
          );
        } else {
          requestAnimationFrame(() =>
            animatedPsjf(
              processes,
              isAnimationRunning,
              animationSpeed,
              i + 1,
              true
            )
          );
        }
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / animationSpeed)
  );
};

export const animatedRot = (
  processes: IProcess[],
  isAnimationRunning: boolean,
  animationSpeed: number,
  i = 0,
  skipNextTimeout = false
) => {
  setTimeout(
    () => {
      const { length } = processes;

      const currentProcess = processes[i % length];

      if (isAnimationRunning) {
        if (currentProcess.timeLeft >= 1) {
          processes[i % length].timeLeft += -1;
          requestAnimationFrame(() =>
            animatedRot(processes, isAnimationRunning, animationSpeed, i + 1)
          );
        } else {
          requestAnimationFrame(() =>
            animatedRot(
              processes,
              isAnimationRunning,
              animationSpeed,
              i + 1,
              true
            )
          );
        }
      }
    },
    skipNextTimeout ? 0 : 1000 * (1 / animationSpeed)
  );
};
