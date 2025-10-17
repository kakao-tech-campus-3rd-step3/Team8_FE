export interface Traveler {
  name: string;
  phone: string;
  email: string;
  img: string;
}

interface ScheduleBase {
  title: string;
  description: string;
}

export interface Waypoint extends ScheduleBase {
  type: 'waypoint';
  time: string;
  address: string;
  memo: string;
}

export interface Edge extends ScheduleBase {
  type: 'edge';
}

export type Schedule = Waypoint | Edge;
