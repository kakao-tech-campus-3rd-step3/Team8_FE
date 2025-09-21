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