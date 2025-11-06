import type { MemoData } from '@/pages/plan/flow/canvasComponents/Memo';
import type { RouteData } from '@/pages/plan/flow/canvasComponents/Route';
import type { WaypointData } from '@/pages/plan/flow/canvasComponents/Waypoint';
import type { TravelerType } from './traveler';

export type planCanvasType = {
  waypoints: WaypointData[];
  memos: MemoData[];
  routes: RouteData[];
  travelers: TravelerType[];
};
