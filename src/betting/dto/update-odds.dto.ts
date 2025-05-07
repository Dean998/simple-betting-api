import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateOddsDto {
  @IsNumber()
  @ApiProperty({ description: 'Odds for the betting market' })
  @ApiProperty({ example: 2.35 })
  @ApiProperty({ required: true })
  @ApiProperty({ minimum: 1 })
  @Min(1, { message: 'Odds must be greater than or equal to 1' })
  odds: number;
}
