import { Injectable, Logger } from '@nestjs/common';
import { BettingMarket, EventStatus, SportType } from './betting.interface';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { NotFoundException } from '@nestjs/common';
import { CreateBettingMarketDto } from './dto/create-betting-market.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class BettingService {
  private bettingMarkets: BettingMarket[] = [];
  private currentMarketId = 1;
  private readonly logger = new Logger(BettingService.name);

  constructor(private readonly eventEmitter: EventEmitter2) {}

  @Cron(CronExpression.EVERY_MINUTE, { name: 'oddsCron' })
  handleOddsCron() {
    this.logger.log('Running odds update cron job');
    this.bettingMarkets.forEach((market) => {
      const updatedOdds = parseFloat((1 + Math.random() * 4).toFixed(2));
      this.updateOdds(market.id, updatedOdds);
    });
  }

  create(market: CreateBettingMarketDto): BettingMarket {
    const newMarket: BettingMarket = {
      id: this.currentMarketId.toString(),
      ...market,
    };
    this.currentMarketId++;
    this.bettingMarkets.push(newMarket);
    this.logger.log(`Betting market created: ${JSON.stringify(newMarket)}`);
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
      throw new NotFoundException(
        `Betting market with ID ${marketId} not found.`,
      );
    }

    const oldOdds = bettingMarket.odds;

    if (oldOdds === updatedOdds) {
      this.logger.warn(
        `No change in odds for betting market ${bettingMarket.id}. Current odds: ${oldOdds}`,
      );
      return bettingMarket;
    }

    bettingMarket.odds = updatedOdds;

    this.eventEmitter.emit('odds.updated', bettingMarket);

    this.logger.log(
      `Event emitted: Odds for betting market ${bettingMarket.id} updated to ${updatedOdds} from ${oldOdds}`,
    );
    this.logger.debug(
      `Betting market details: ${JSON.stringify(bettingMarket)}`,
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
