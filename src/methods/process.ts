import { IProcess } from "@/store/models.interface";

const roundTwoDecimals = (x: number) => {
  return Math.round(x * 100) / 100;
};

export const averageWaitingTimeFcfs = (processes: IProcess[]) => {
  let accelerator = 0;

  for (let i = 0; i < processes.length - 1; i++) {
    accelerator += accelerator + processes[i].neededTime;
  }

  const avg = accelerator / processes.length;
  return roundTwoDecimals(avg);
};

export const generateRandomProcess = () => {
  const randomTime = Math.floor(Math.random() * 10) + 1;
  return {
    id: `asdasdasdasdasd`,
    neededTime: randomTime,
    timeLeft: randomTime,
    totalWaitingTime: 0
  } as IProcess;
};
