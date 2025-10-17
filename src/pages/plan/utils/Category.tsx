import { colorSystem } from '@/styles/colorSystem';

export const LocationCategoryInfo = {
  // DEFAULT
  DEFAULT: { icon: '📍', color: colorSystem.tertiary_white._700 },
  // FOOD
  RESTAURANT: { icon: '🍔', color: '#ff6b6b' },
  CAFE: { icon: '☕', color: '#ff6b6b' },
  BAR: { icon: '🍸', color: '#ff6b6b' },
  // CULTURE
  MUSEUM: { icon: '🏛️', color: '#f06595' },
  LIBRARY: { icon: '📚', color: '#f06595' },
  CENTER: { icon: '🎭', color: '#f06595' },
  // ACCOMODATION
  HOTEL: { icon: '🏨', color: '#cc5de8' },
  // TOUR
  STORE: { icon: '🛍️', color: '#845ef7' },
  LANDMARK: { icon: '🌴', color: '#845ef7' },
  ACTIVITY: { icon: '🎢', color: '#845ef7' },
  // TRANSPORTATION
  AIRPORT: { icon: '✈️', color: '#5c7cfa' },
  TERMINAL: { icon: '🚌', color: '#5c7cfa' },
  STATION: { icon: '🚉', color: '#5c7cfa' },
} as const;

export type LocationCategory = keyof typeof LocationCategoryInfo;

export const TransportationCategoryInfo = {
  DEFAULT: { icon: '🚗', color: '#adb5bd' },
  WALK: { icon: '🚶', color: '#40c057' },
  BUS: { icon: '🚌', color: '#339af0' },
  TAXI: { icon: '🚕', color: '#fcc419' },
  CAR: { icon: '🚗', color: '#5f3dc4' },
  BICYCLE: { icon: '🚲', color: '#20c997' },
  AIRPLANE: { icon: '✈️', color: '#5c7cfa' },
  TRAIN: { icon: '🚆', color: '#4263eb' },
  SHIP: { icon: '🚢', color: '#228be6' },
  MOTORCYCLE: { icon: '🏍️', color: '#e8590c' },
  SCOOTER: { icon: '🛴', color: '#7950f2' },
} as const;

export type TransportationCategory = keyof typeof TransportationCategoryInfo;

export const TransportationCategoryOptions = Object.entries(TransportationCategoryInfo).map(
  ([key, info]) => (
    <option key={key} value={key}>
      {info.icon} {key}
    </option>
  )
);
