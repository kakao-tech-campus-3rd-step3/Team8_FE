import { colorSystem } from '@/styles/colorSystem';

export const LocationType = {
  DEFAULT: {
    DEFAULT: 'DEFAULT',
  },
  FOOD: {
    RESTAURANT: 'RESTAURANT',
    CAFE: 'CAFE',
    BAR: 'BAR',
  },
  CULTURE: {
    MUSEUM: 'MUSEUM',
    LIBRARY: 'LIBRARY',
    CENTER: 'CENTER',
  },
  ACCOMODATION: {
    HOTEL: 'HOTEL',
  },
  TOUR: {
    STORE: 'STORE',
    LANDMARK: 'LANDMARK',
    ACTIVITY: 'ACTIVITY',
  },
  TRANSPORTATION: {
    AIRPORT: 'AIRPORT',
    TERMINAL: 'TERMINAL',
    STATION: 'STATION',
  },
} as const;

export type LocationCategory =
  | (typeof LocationType.DEFAULT)[keyof typeof LocationType.DEFAULT]
  | (typeof LocationType.FOOD)[keyof typeof LocationType.FOOD]
  | (typeof LocationType.CULTURE)[keyof typeof LocationType.CULTURE]
  | (typeof LocationType.ACCOMODATION)[keyof typeof LocationType.ACCOMODATION]
  | (typeof LocationType.TOUR)[keyof typeof LocationType.TOUR]
  | (typeof LocationType.TRANSPORTATION)[keyof typeof LocationType.TRANSPORTATION];

export const LocationCategoryMeta: Record<LocationCategory, { icon: string; color: string }> = {
  [LocationType.DEFAULT.DEFAULT]: {
    icon: '📍',
    color: colorSystem.tertiary_white._700,
  },
  [LocationType.FOOD.RESTAURANT]: { icon: '🍔', color: '#ff6b6b' },
  [LocationType.FOOD.CAFE]: { icon: '☕', color: '#ff6b6b' },
  [LocationType.FOOD.BAR]: { icon: '🍸', color: '#ff6b6b' },
  [LocationType.CULTURE.MUSEUM]: { icon: '🏛️', color: '#f06595' },
  [LocationType.CULTURE.LIBRARY]: { icon: '📚', color: '#f06595' },
  [LocationType.CULTURE.CENTER]: { icon: '🎭', color: '#f06595' },
  [LocationType.ACCOMODATION.HOTEL]: { icon: '🏨', color: '#cc5de8' },
  [LocationType.TOUR.STORE]: { icon: '🛍️', color: '#845ef7' },
  [LocationType.TOUR.LANDMARK]: { icon: '🌴', color: '#845ef7' },
  [LocationType.TOUR.ACTIVITY]: { icon: '🎢', color: '#845ef7' },
  [LocationType.TRANSPORTATION.AIRPORT]: { icon: '✈️', color: '#5c7cfa' },
  [LocationType.TRANSPORTATION.TERMINAL]: { icon: '🚌', color: '#5c7cfa' },
  [LocationType.TRANSPORTATION.STATION]: { icon: '🚉', color: '#5c7cfa' },
};

export const TransportationCategory = {
  DEFAULT: 'DEFAULT',
  WALK: 'WALK',
  BUS: 'BUS',
  TAXI: 'TAXI',
  CAR: 'CAR',
  BICYCLE: 'BICYCLE',
  AIRPLANE: 'AIRPLANE',
  TRAIN: 'TRAIN',
  SHIP: 'SHIP',
  MOTORCYCLE: 'MOTORCYCLE',
  SCOOTER: 'SCOOTER',
} as const;

export type TransportationCategory =
  (typeof TransportationCategory)[keyof typeof TransportationCategory];

export const TransportationCategoryMeta: Record<
  TransportationCategory,
  { icon: string; color: string }
> = {
  [TransportationCategory.DEFAULT]: {
    icon: '🚗',
    color: '#adb5bd', // gray tone
  },
  [TransportationCategory.WALK]: { icon: '🚶', color: '#40c057' },
  [TransportationCategory.BUS]: { icon: '🚌', color: '#339af0' },
  [TransportationCategory.TAXI]: { icon: '🚕', color: '#fcc419' },
  [TransportationCategory.CAR]: { icon: '🚗', color: '#5f3dc4' },
  [TransportationCategory.BICYCLE]: { icon: '🚲', color: '#20c997' },
  [TransportationCategory.AIRPLANE]: { icon: '✈️', color: '#5c7cfa' },
  [TransportationCategory.TRAIN]: { icon: '🚆', color: '#4263eb' },
  [TransportationCategory.SHIP]: { icon: '🚢', color: '#228be6' },
  [TransportationCategory.MOTORCYCLE]: { icon: '🏍️', color: '#e8590c' },
  [TransportationCategory.SCOOTER]: { icon: '🛴', color: '#7950f2' },
};
