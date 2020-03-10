import { IProcess } from "@/store/models.interface";

export const averageWaitingTimeFcfs = (processes: IProcess[]) => {
  let accelerator = 0;

  for (let i = 0; i < processes.length - 1; i++) {
    accelerator += accelerator + processes[i].neededTime;
  }
  return accelerator / processes.length;
};
