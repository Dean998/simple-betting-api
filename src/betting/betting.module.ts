import { Module } from '@nestjs/common';
import { BettingService } from './betting.service';
import { BettingController } from './betting.controller';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [BettingService],
  controllers: [BettingController],
})
export class BettingModule {}
