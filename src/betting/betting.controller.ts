import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BettingService } from './betting.service';
import { BettingMarket, SportType, EventStatus } from './betting.interface';
import { CreateBettingMarketDto } from './dto/create-betting-market.dto';
import { UpdateOddsDto } from './dto/update-odds.dto';

@Controller('betting')
export class BettingController {
  constructor(private readonly bettingService: BettingService) {}

  @Post()
  createMarket(@Body() market: CreateBettingMarketDto): BettingMarket {
    return this.bettingService.create(market);
  }

  @Get()
  getMarkets(
    @Query('sportType') sportType?: SportType,
    @Query('eventStatus') eventStatus?: EventStatus,
  ): BettingMarket[] {
    return this.bettingService.findAll({ sportType, eventStatus });
  }

  @Get(':id')
  getMarketById(@Param('id') id: string): BettingMarket {
    return this.bettingService.findOne(id);
  }

  @Patch(':id/odds')
  updateOdds(
    @Param('id') id: string,
    @Body() updateOddsDto: UpdateOddsDto,
  ): BettingMarket {
    console.log('updateOddsDto', updateOddsDto);
    const { odds } = updateOddsDto;
    return this.bettingService.updateOdds(id, odds);
  }
}
