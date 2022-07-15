import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { ValidationService } from 'src/utils/services/validation.service';
import { GoogleDriveService } from 'src/utils/services/google-drive.service';

@Module({
  imports: [TypeOrmModule.forFeature([Country])],
  controllers: [CountriesController],
  providers: [CountriesService, ValidationService, GoogleDriveService],
})
export class CountriesModule {}
