import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import {
  MAX_COUNTRY_NAME_LENGTH,
  MIN_COUNTRY_NAME_LENGTH,
} from 'src/utils/consts';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(MIN_COUNTRY_NAME_LENGTH)
  @MaxLength(MAX_COUNTRY_NAME_LENGTH)
  name: string;
}
