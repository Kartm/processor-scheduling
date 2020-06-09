import { ITask } from "@/store/disk-scheduling/models.interface";

export const generateRandomTask = () => {
  return {
    id: `asdasdasdasdasd`,
    used: false,
    deadline: Math.floor(Math.random() * 10) + 1,
    maxDeadline: 10,
    position: Math.floor(Math.random() * 10) + 1
  } as ITask;
};
