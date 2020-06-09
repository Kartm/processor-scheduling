export interface IProcess {
  id: string;
  neededTime: number;
  timeLeft: number;
  totalWaitingTime: number;
}

export const enum Algorithm {
  fcfs,
  sjf,
  psjf,
  rot
}
