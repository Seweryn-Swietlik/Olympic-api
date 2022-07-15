import { Module } from '@nestjs/common';
import { OlympicsModule } from './olympics/olympics.module';
import { CountriesModule } from './countries/countries.module';
import { ResultsModule } from './results/results.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    OlympicsModule,
    CountriesModule,
    ResultsModule,
  ],
})
export class AppModule {}
