import type { TransportationCategory } from '../../utils/Category';

export interface ArrowData extends Record<string, unknown> {
  startId: number;
  endId: number;
  transportationCategory: TransportationCategory;
  title: string;
  description: string;
  duration: number; // minutes
}
