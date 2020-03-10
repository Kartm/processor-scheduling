export interface IProcess {
  id: string;
  neededTime: number;
  usedTime: number;
  totalWaitingTime: number;
}

export const enum Algorithm {
  fcfs,
  sjf,
  psjf,
  rot
}
