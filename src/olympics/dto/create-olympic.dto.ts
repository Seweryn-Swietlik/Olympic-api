import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';
import { CURRENT_YEAR, FIRST_OLYMPIC_YEAR } from 'src/utils/consts';
import { VerifyOlympicKind } from 'src/utils/decorators';

export class CreateOlympicDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(FIRST_OLYMPIC_YEAR)
  @Max(CURRENT_YEAR)
  year: number;

  @IsNotEmpty()
  @IsString()
  @VerifyOlympicKind()
  kind: 'winter' | 'summer';

  @IsNotEmpty()
  @IsString()
  location: string;
}
