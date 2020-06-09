export interface ITask {
  id: string;
  used: boolean;
  deadline: number;
  maxDeadline: number;
  position: number;
}

export const enum Algorithm {
  fcfs,
  sstf,
  scan,
  cscan,
  edf,
  fdscan
}
