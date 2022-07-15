import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationService } from 'src/utils/validation.service';
import { Medals } from './entities/medals.entity';
import { MedalsService } from './medals.service';

@Module({
  imports: [TypeOrmModule.forFeature([Medals])],
  providers: [MedalsService, ValidationService],
  exports: [MedalsService],
})
export class MedalsModule {}
