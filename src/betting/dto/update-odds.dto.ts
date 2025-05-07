import { IsNumber, Min } from 'class-validator';

export class UpdateOddsDto {
  @IsNumber()
  @Min(1, { message: 'Odds must be greater than or equal to 1' })
  odds: number;
}
