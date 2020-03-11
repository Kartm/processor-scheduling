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
