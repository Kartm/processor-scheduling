import { IProcess } from "@/store/processor-scheduling/models.interface";

export const generateRandomProcess = () => {
  const randomTime = Math.floor(Math.random() * 10) + 1;
  return {
    id: `asdasdasdasdasd`,
    neededTime: randomTime,
    timeLeft: randomTime,
    totalWaitingTime: 0
  } as IProcess;
};
