import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { ValidationService } from 'src/utils/validation.service';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countriesRepository: Repository<Country>,
    private validationService: ValidationService,
  ) {}

  async create({ name }: CreateCountryDto) {
    const existingCountry = await this.countriesRepository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', {
        name,
      })
      .getOne();
    this.validationService.throwIfExist(existingCountry);

    const country = this.countriesRepository.create({ name });
    await this.countriesRepository.save(country);
    return country.id;
  }

  findAll(offset?: number, limit?: number) {
    return this.countriesRepository.find({
      relations: ['result', 'result.olympic', 'result.medals'],
      order: { name: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.countriesRepository.findOne({
      where: { id },
      relations: ['result', 'result.olympic', 'result.medals'],
    });
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country = await this.findOne(id);
    this.validationService.throwIfNotExist(id, country);

    this.countriesRepository.update(country.id, updateCountryDto);
    return country.id;
  }

  async remove(id: number) {
    const country = await this.findOne(id);
    this.validationService.throwIfNotExist(id, country);

    this.countriesRepository.remove(country);
    return country.id;
  }
}
