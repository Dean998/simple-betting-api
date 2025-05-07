import { Injectable } from '@nestjs/common';
import { BettingMarket, EventStatus, SportType } from './betting.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class BettingService {
  private bets: BettingMarket[] = [];

  create(market: Omit<BettingMarket, 'id'>): BettingMarket {
    const newMarket: BettingMarket = {
      ...market,
      id: randomUUID(),
    };
    this.bets.push(newMarket);
    return newMarket;
  }

  findAll(filter?: {
    sportType?: SportType;
    eventStatus?: EventStatus;
  }): BettingMarket[] {
    return this.bets.filter((market) => {
      if (filter?.sportType && market.sportType !== filter.sportType)
        return false;
      if (filter?.eventStatus && market.eventStatus !== filter.eventStatus)
        return false;
      return true;
    });
  }
}
