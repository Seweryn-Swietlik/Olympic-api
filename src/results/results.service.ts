import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MedalsService } from 'src/medals/medals.service';
import { ValidationService } from 'src/utils/services/validation.service';
import { Repository } from 'typeorm';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { Result } from './entities/result.entity';

@Injectable()
export class ResultsService {
  constructor(
    @InjectRepository(Result)
    private resultsRepository: Repository<Result>,
    private medalsService: MedalsService,
    private validationService: ValidationService,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const medals = await this.medalsService.create(createResultDto.medals);
    const result = this.resultsRepository.create({
      ...createResultDto,
      medals,
    });
    await this.resultsRepository.save(result);
    return result.id;
  }

  findAllSortedByMedals(offset?: number, limit?: number) {
    return this.resultsRepository.find({
      relations: ['country', 'olympic'],
      order: { medals: { gold: 'DESC', silver: 'DESC', brown: 'DESC' } },
      skip: offset,
      take: limit,
    });
  }

  findOne(id: number) {
    return this.resultsRepository.findOne({
      where: { id },
      relations: ['country', 'olympic', 'medals'],
    });
  }

  async update(id: number, updateResultDto: UpdateResultDto) {
    const result = await this.findOne(id);
    this.validationService.throwIfNotExist(id, result);

    await this.resultsRepository.update(result.id, updateResultDto);
    await this.medalsService.update(result.medals.id, updateResultDto.medals);
    return result.id;
  }

  async remove(id: number) {
    const result = await this.findOne(id);
    this.validationService.throwIfNotExist(id, result);

    await this.resultsRepository.remove(result);
    await this.medalsService.remove(result.medals.id);
    return result.id;
  }
}
