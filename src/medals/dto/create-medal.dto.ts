import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { MIN_NUMBER_OF_MEDALS } from 'src/utils/consts';

export class CreateMedalsDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(MIN_NUMBER_OF_MEDALS)
  gold: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(MIN_NUMBER_OF_MEDALS)
  silver: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(MIN_NUMBER_OF_MEDALS)
  brown: number;
}
