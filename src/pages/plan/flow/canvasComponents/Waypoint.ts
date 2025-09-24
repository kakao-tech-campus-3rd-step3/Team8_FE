import type { LocationCategory } from '../../utils/Category';

export interface WaypointData extends Record<string, unknown> {
  id: number;
  title: string;
  description: string;
  address: string;
  startTime: Date;
  endTime: Date;
  memoID: number;
  locationCategory: LocationCategory;
  xPosition: number;
  yPosition: number;
}
