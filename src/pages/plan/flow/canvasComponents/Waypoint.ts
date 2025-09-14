import type { LocationCategory } from '../../utils/Category';

export interface WaypointData {
  id: number;
  title: string;
  description: string;
  address: string;
  startTime: string;
  endTime: string;
  memoID: number;
  locationCategory: LocationCategory.type;
  xPosition: number;
  yPosition: number;
}
