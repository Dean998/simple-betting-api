export enum EventStatus {
  UPCOMING = 'upcoming',
  LIVE = 'live',
  FINISHED = 'finished',
}

export enum SportType {
  FOOTBALL = 'football',
  BASKETBALL = 'basketball',
  TENNIS = 'tennis',
}

export interface BettingMarket {
  id: string;
  name: string;
  sportType: SportType;
  eventStatus: EventStatus;
  odds: number;
}
