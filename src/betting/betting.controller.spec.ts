import { Test, TestingModule } from '@nestjs/testing';
import { BettingController } from './betting.controller';
import { BettingService } from './betting.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

describe('BettingController', () => {
  let controller: BettingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [EventEmitterModule.forRoot()],
      providers: [BettingService],
      controllers: [BettingController],
    }).compile();

    controller = module.get<BettingController>(BettingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
