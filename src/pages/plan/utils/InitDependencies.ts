import type { InitTask } from '../types/initTask';

export const initDependencies: Record<InitTask, InitTask[]> = {
  WAYPOINT: [],
  MEMO: ['WAYPOINT'], // MEMO는 WAYPOINT 이후
  ROUTE: ['WAYPOINT'], // ROUTE도 WAYPOINT 이후
  TRAVELER: ['ROUTE'], // TRAVELER는 ROUTE 이후
};
