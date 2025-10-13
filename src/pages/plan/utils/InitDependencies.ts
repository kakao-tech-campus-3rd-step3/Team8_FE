export const initDependencies: Record<InitTaskName, InitTaskName[]> = {
  WAYPOINT: [],
  MEMO: ['WAYPOINT'], // MEMO는 WAYPOINT 이후
  ROUTE: ['WAYPOINT'], // ROUTE도 WAYPOINT 이후
  TRAVELER: ['ROUTE'], // TRAVELER는 ROUTE 이후
};
