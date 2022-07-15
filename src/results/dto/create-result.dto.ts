import {
  IsNotEmpty,
  IsString,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';

import { Type } from 'class-transformer';
import { CreateMedalsDto } from 'src/medals/dto/create-medal.dto';

export class CreateResultDto {
  @IsNotEmpty()
  @IsString()
  countryId: string;

  @IsNotEmpty()
  @IsString()
  olympicId: string;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => CreateMedalsDto)
  medals: CreateMedalsDto;
}
