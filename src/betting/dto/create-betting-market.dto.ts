import { IsEnum, IsString, IsNumber, Min } from 'class-validator';
import { EventStatus, SportType } from '../betting.interface';

export class CreateBettingMarketDto {
  @IsString()
  name: string;

  @IsEnum(SportType)
  sportType: SportType;

  @IsEnum(EventStatus)
  eventStatus: EventStatus;

  @IsNumber()
  @Min(1, { message: 'Odds must be greater than or equal to 1' })
  odds: number;
}
