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
import { CreateBettingMarketDto } from './dto/create-betting-market.dto';
import { UpdateOddsDto } from './dto/update-odds.dto';
import { SportType, EventStatus } from './betting-market.enums';
import { BettingMarketDto } from './dto/betting-market-response.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('betting')
export class BettingController {
  constructor(private readonly bettingService: BettingService) {}

  @Post()
  @ApiOkResponse({ type: BettingMarketDto })
  createMarket(@Body() market: CreateBettingMarketDto): BettingMarketDto {
    return this.bettingService.create(market);
  }

  @Get()
  @ApiOkResponse({ type: [BettingMarketDto] })
  getMarkets(
    @Query('sportType') sportType?: SportType,
    @Query('eventStatus') eventStatus?: EventStatus,
  ): BettingMarketDto[] {
    return this.bettingService.findAll({ sportType, eventStatus });
  }

  @Get(':id')
  @ApiOkResponse({ type: BettingMarketDto })
  getMarketById(@Param('id') id: string): BettingMarketDto {
    return this.bettingService.findOne(id);
  }

  @Patch(':id/odds')
  @ApiOkResponse({ type: BettingMarketDto })
  updateOdds(
    @Param('id') id: string,
    @Body() updateOddsDto: UpdateOddsDto,
  ): BettingMarketDto {
    console.log('updateOddsDto', updateOddsDto);
    const { odds } = updateOddsDto;
    return this.bettingService.updateOdds(id, odds);
  }
}
