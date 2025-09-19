import type { TransportationCategory } from '../../utils/Category';

export interface ArrowData {
  memoId: number;
  startId: number;
  endId: number;
  transportationCategory: TransportationCategory;
  title: string;
  description: string;
  duration: number; // minutes
}
