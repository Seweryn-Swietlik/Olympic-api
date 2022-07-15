import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { MedalsModule } from 'src/medals/medals.module';
import { ValidationService } from 'src/utils/services/validation.service';

@Module({
  imports: [TypeOrmModule.forFeature([Result]), MedalsModule],
  controllers: [ResultsController],
  providers: [ResultsService, ValidationService],
})
export class ResultsModule {}
