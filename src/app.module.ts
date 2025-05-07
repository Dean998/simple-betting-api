import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BettingModule } from './betting/betting.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [BettingModule, ScheduleModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
