import type { TravelerType } from './traveler';

export type PlanDetailType = {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  travelers: TravelerType[];
};
