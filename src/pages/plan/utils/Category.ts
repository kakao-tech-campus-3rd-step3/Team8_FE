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
