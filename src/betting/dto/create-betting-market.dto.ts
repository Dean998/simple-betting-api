import { IsEnum, IsString, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SportType, EventStatus } from '../betting-market.enums';

export class CreateBettingMarketDto {
  @IsString()
  @ApiProperty({ description: 'Name of the betting market' })
  @ApiProperty({ example: 'Premier League Match' })
  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ description: 'Type of sport', enum: SportType })
  @ApiProperty({ example: 'football' })
  @ApiProperty({ required: true })
  @IsEnum(SportType)
  sportType: SportType;

  @ApiProperty({ description: 'Status of the event', enum: EventStatus })
  @ApiProperty({ example: 'upcoming' })
  @ApiProperty({ required: true })
  @IsEnum(EventStatus)
  eventStatus: EventStatus;

  @ApiProperty({ description: 'Odds for the betting market' })
  @ApiProperty({ example: 1.5 })
  @ApiProperty({ required: true })
  @IsNumber()
  @Min(1, { message: 'Odds must be greater than or equal to 1' })
  odds: number;
}
