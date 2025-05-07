import { Injectable, Logger } from '@nestjs/common';
import { BettingMarket, EventStatus, SportType } from './betting.interface';
import { randomUUID } from 'crypto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class BettingService {
  private bettingMarkets: BettingMarket[] = [];
  private readonly logger = new Logger(BettingService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  create(market: Omit<BettingMarket, 'id'>): BettingMarket {
    const newMarket: BettingMarket = {
      ...market,
      id: randomUUID(),
    };
    this.bettingMarkets.push(newMarket);
    return newMarket;
  }

  findAll(filter?: {
    sportType?: SportType;
    eventStatus?: EventStatus;
  }): BettingMarket[] {
    return this.bettingMarkets.filter((market) => {
      if (filter?.sportType && market.sportType !== filter.sportType)
        return false;
      if (filter?.eventStatus && market.eventStatus !== filter.eventStatus)
        return false;
      return true;
    });
  }
  findOne(id: string): BettingMarket | undefined {
    return this.bettingMarkets.find((market) => market.id === id);
  }

  updateOdds(marketId: string, updatedOdds: number): BettingMarket {
    const bettingMarket = this.bettingMarkets.find(
      (market) => market.id === marketId,
    );

    if (!bettingMarket) {
      this.logger.error(`Betting market with ID ${marketId} not found.`);
      throw new Error(`Betting market with ID ${marketId} not found.`);
    }

    bettingMarket.odds = updatedOdds;

    this.eventEmitter.emit('odds.updated', bettingMarket);

    this.logger.log(
      `Event emitted: Odds for betting market ${bettingMarket.id} updated to ${updatedOdds} from ${bettingMarket.odds}`,
    );

    return bettingMarket;
  }

  @OnEvent('odds.updated')
  handleOddsUpdatedEvent(bettingMarket: BettingMarket) {
    this.logger.log(
      `Event received: odds updated for market ${bettingMarket.id}, new odds: ${bettingMarket.odds}`,
    );
  }
}
