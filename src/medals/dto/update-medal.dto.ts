import { PartialType } from '@nestjs/mapped-types';
import { CreateMedalsDto } from './create-medal.dto';

export class UpdateMedalsDto extends PartialType(CreateMedalsDto) {}
