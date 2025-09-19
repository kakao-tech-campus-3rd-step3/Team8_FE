import { colorSystem } from '@/styles/colorSystem';

export const categoryStyles: { [key: string]: { icon: string; color: string } } = {
  Default: { icon: '📍', color: colorSystem.tertiary_white._700 },
  Food: { icon: '🍔', color: '#ff6b6b' },
  Culture: { icon: '🏛️', color: '#f06595' },
  Accomodation: { icon: '🏨', color: '#cc5de8' },
  Tour: { icon: '🌴', color: '#845ef7' },
  Transportation: { icon: '✈️', color: '#5c7cfa' },
};

export const locationCategories = Object.keys(categoryStyles);

export namespace LocationCategory {
  export enum DEFAULT {
    DEFAULT = 'DEFAULT',
  }
  export enum FOOD {
    RESTAURANT = 'RESTAURANT',
    CAFE = 'CAFE',
    BAR = 'BAR',
  }
  export enum CULTURE {
    MUSEUM = 'MUSEUM',
    LIBRARY = 'LIBRARY',
    CENTER = 'CENTER',
  }
  export enum ACCOMODATION {
    HOTEL = 'HOTEL',
  }
  export enum TOUR {
    STORE = 'STORE',
    LANDMARK = 'LANDMARK',
    ACTIVITY = 'ACTIVITY',
  }
  export enum TRANSPORTATION {
    AIRPORT = 'AIRPORT',
    TERMINAL = 'TERMINAL',
    STATION = 'STATION',
  }

  export type type = DEFAULT | FOOD | CULTURE | ACCOMODATION | TOUR | TRANSPORTATION;
}

export enum TransportationCategory {
  DEFAULT = 'DEFAULT',
  WALK = 'WALK',
  BUS = 'BUS',
  TAXI = 'TAXI',
  CAR = 'CAR',
  BICYCLE = 'BICYCLE',
  AIRPLANE = 'AIRPLANE',
  TRAIN = 'TRAIN',
  SHIP = 'SHIP',
  MOTORCYCLE = 'MOTORCYCLE',
  SCOOTER = 'SCOOTER',
}