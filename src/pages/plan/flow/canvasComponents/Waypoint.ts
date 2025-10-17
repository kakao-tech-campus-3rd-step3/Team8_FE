import type { LocationCategory } from '../../utils/Category';

export interface WaypointData extends Record<string, unknown> {
  id: number;
  name: string;
  description: string;
  address: string;
  startTime: Date | null;
  endTime: Date | null;
  memoID: number;
  locationCategory: LocationCategory;
  xPosition: number;
  yPosition: number;
}
