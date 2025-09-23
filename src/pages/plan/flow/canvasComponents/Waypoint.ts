import type { LocationCategory } from '../../utils/Category';

export interface WaypointData {
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
