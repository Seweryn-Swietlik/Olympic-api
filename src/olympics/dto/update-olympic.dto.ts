import { PartialType } from '@nestjs/mapped-types';
import { CreateOlympicDto } from './create-olympic.dto';

export class UpdateOlympicDto extends PartialType(CreateOlympicDto) {}
