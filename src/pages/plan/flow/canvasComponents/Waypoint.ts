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

export interface WaypointNodeData {
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  memo: string;
  category: string;
}

export const defaultWaypointData: WaypointNodeData = {
  title: '장소',
  description: '상세주소',
  startTime: new Date(0, 0, 0, 10, 22),
  endTime: new Date(0, 0, 0, 12, 22),
  memo: '',
  category: 'Default',
};