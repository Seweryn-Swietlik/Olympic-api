import { Module } from '@nestjs/common';
import { OlympicsService } from './olympics.service';
import { OlympicsController } from './olympics.controller';
import { Olympic } from './entities/olympic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValidationService } from 'src/utils/services/validation.service';
@Module({
  imports: [TypeOrmModule.forFeature([Olympic])],
  controllers: [OlympicsController],
  providers: [OlympicsService, ValidationService],
})
export class OlympicsModule {}
