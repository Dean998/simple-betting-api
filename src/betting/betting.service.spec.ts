import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { EventStatus, SportType } from './betting-market.enums';
import { BettingService } from './betting.service';

describe('BettingService', () => {
  let service: BettingService;
  let eventEmitter: EventEmitter2;

  beforeEach(async () => {
    const eventEmitterMock = {
      emit: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BettingService,
        { provide: EventEmitter2, useValue: eventEmitterMock },
      ],
    }).compile();

    service = module.get<BettingService>(BettingService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a betting market', () => {
    const created = service.create({
      name: 'Arsenal vs PSG',
      sportType: SportType.FOOTBALL,
      eventStatus: EventStatus.UPCOMING,
      odds: 1.5,
    });

    expect(created).toHaveProperty('id');
    expect(created.name).toBe('Arsenal vs PSG');
  });

  it('should filter markets by sport type', () => {
    service.create({
      name: 'Roger Federer vs Rafael Nadal',
      sportType: SportType.TENNIS,
      eventStatus: EventStatus.LIVE,
      odds: 2.2,
    });

    const filtered = service.findAll({ sportType: SportType.TENNIS });
    expect(filtered).toHaveLength(1);
    expect(filtered[0].sportType).toBe(SportType.TENNIS);
  });

  it('should update odds and emit event', () => {
    const market = service.create({
      name: 'NBA Playoffs',
      sportType: SportType.BASKETBALL,
      eventStatus: EventStatus.UPCOMING,
      odds: 1.8,
    });

    const updated = service.updateOdds(market.id, 2.1);

    expect(updated.odds).toBe(2.1);
    expect(eventEmitter.emit).toHaveBeenCalledWith('odds.updated', updated);
  });
});
