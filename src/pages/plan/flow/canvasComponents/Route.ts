import type { VehicleCategory } from '../../utils/Category';

export interface RouteData extends Record<string, unknown> {
  fromWaypointId: number;
  toWaypointId: number;
  title: string;
  description: string;
  duration: number; // minutes
  vehicleCategory: VehicleCategory;
}
