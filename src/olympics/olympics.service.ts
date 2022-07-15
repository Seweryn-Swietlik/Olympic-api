import { Injectable } from '@nestjs/common';
import { Brackets, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateOlympicDto } from './dto/update-olympic.dto';
import { CreateOlympicDto } from './dto/create-olympic.dto';
import { Olympic } from './entities/olympic.entity';
import { ValidationService } from 'src/utils/validation.service';

@Injectable()
export class OlympicsService {
  constructor(
    @InjectRepository(Olympic)
    private olympicsRepository: Repository<Olympic>,
    private validationService: ValidationService,
  ) {}

  async create({ year, location, kind }: CreateOlympicDto) {
    const existingOlympic = await this.findExistingOlympic({
      year,
      location,
      kind,
    });
    this.validationService.throwIfExist(existingOlympic);

    const olympic = this.olympicsRepository.create({
      year,
      location: location,
      kind,
    });
    await this.olympicsRepository.save(olympic);
    return olympic.id;
  }

  findAllSortedByYear(offset?: number, limit?: number) {
    return this.olympicsRepository.find({
      relations: ['result', 'result.country', 'result.medals'],
      order: { year: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  findAllSortedByLocation(offset?: number, limit?: number) {
    return this.olympicsRepository.find({
      relations: ['result', 'result.country', 'result.medals'],
      order: { location: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  findAllSortedByKind(offset?: number, limit?: number) {
    return this.olympicsRepository.find({
      relations: ['result', 'result.country', 'result.medals'],
      order: { kind: 'DESC' },
      skip: offset,
      take: limit,
    });
  }

  findOneSortedByCountryName(id: number) {
    return this.olympicsRepository.findOne({
      where: { id },
      relations: ['result', 'result.country', 'result.medals'],
      order: { result: { country: { name: 'DESC' } } },
    });
  }

  findOneSortedByMedals(id: number) {
    return this.olympicsRepository.findOne({
      where: { id },
      relations: ['result', 'result.country', 'result.medals'],
      order: {
        result: { medals: { gold: 'DESC', silver: 'DESC', brown: 'DESC' } },
      },
    });
  }

  async update(id: number, updateOlympicDto: UpdateOlympicDto) {
    const olympic = await this.findOne(id);
    this.validationService.throwIfNotExist(id, olympic);

    this.olympicsRepository.update(olympic.id, updateOlympicDto);
    return olympic.id;
  }

  async remove(id: number) {
    const olympic = await this.findOne(id);
    this.validationService.throwIfNotExist(id, olympic);

    this.olympicsRepository.remove(olympic);
    return olympic.id;
  }

  private findOne(id: number) {
    return this.olympicsRepository.findOne({ where: { id } });
  }

  // private findExistingOlympic({ year, kind, location }: CreateOlympicDto) {
  //   return this.olympicsRepository
  //     .createQueryBuilder()
  //     .where('LOWER(kind) = LOWER(:kind) OR ', {
  //       kind,
  //     })
  //     .andWhere(
  //       new Brackets((qb) => {
  //         qb.where('year = :year', {
  //           year,
  //         }).andWhere('LOWER(location) = LOWER(:location)', { location });
  //       }),
  //     )
  //     .getOne();
  // }

  // private findExistingOlympic({ year, kind, location }: CreateOlympicDto) {
  //   return this.olympicsRepository
  //     .createQueryBuilder()
  //     .where('LOWER(kind) = LOWER(:kind)', {
  //       kind,
  //     })
  //     .andWhere('year = :year', {
  //       year,
  //     })
  //     .andWhere('LOWER(location) = LOWER(:location)', { location })
  //     .getOne();
  // }

  private findExistingOlympic({ year, kind, location }: CreateOlympicDto) {
    return this.olympicsRepository
      .createQueryBuilder()
      .where(
        'LOWER(kind) = LOWER(:kind) AND year = :year AND LOWER(location) = LOWER(:location)',
        {
          kind,
          year,
          location,
        },
      )
      .getOne();
  }
}
