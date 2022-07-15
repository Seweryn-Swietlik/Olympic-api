import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValidationService } from 'src/utils/services/validation.service';
import { Repository } from 'typeorm';
import { CreateMedalsDto } from './dto/create-medal.dto';
import { UpdateMedalsDto } from './dto/update-medal.dto';
import { Medals } from './entities/medals.entity';

@Injectable()
export class MedalsService {
  constructor(
    @InjectRepository(Medals)
    private medalsRepository: Repository<Medals>,
    private validationService: ValidationService,
  ) {}

  async create(createMedalsDto: CreateMedalsDto) {
    const total = this.calculateMedals(createMedalsDto);
    const medals = this.medalsRepository.create({ ...createMedalsDto, total });
    await this.medalsRepository.save(medals);
    return medals;
  }

  async update(id: number, updateMedalsDto: UpdateMedalsDto) {
    const medals = await this.findOne(id);
    this.validationService.throwIfNotExist(id, medals);

    this.medalsRepository.update(medals.id, updateMedalsDto);
    return medals.id;
  }

  async remove(id: number) {
    const medals = await this.findOne(id);
    this.validationService.throwIfNotExist(id, medals);

    this.medalsRepository.remove(medals);
    return medals.id;
  }

  private findOne(id: number) {
    return this.medalsRepository.findOne({
      where: { id },
    });
  }

  private calculateMedals({ gold, silver, brown }: CreateMedalsDto) {
    return gold + silver + brown;
  }
}
