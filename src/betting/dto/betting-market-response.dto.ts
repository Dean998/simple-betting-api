import { ApiProperty } from '@nestjs/swagger';
import { SportType, EventStatus } from '../betting-market.enums';

export class BettingMarketDto {
  @ApiProperty({ example: '1' })
  id: string;

  @ApiProperty({ example: 'Chelsea vs Arsenal' })
  name: string;

  @ApiProperty({ enum: SportType, example: SportType.FOOTBALL })
  sportType: SportType;

  @ApiProperty({ enum: EventStatus, example: EventStatus.UPCOMING })
  eventStatus: EventStatus;

  @ApiProperty({ example: 2.35, minimum: 1 })
  odds: number;
}
