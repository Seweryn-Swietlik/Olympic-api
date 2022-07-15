import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { OlympicsService } from './olympics.service';
import { CreateOlympicDto } from './dto/create-olympic.dto';
import { UpdateOlympicDto } from './dto/update-olympic.dto';
import { PaginationParams } from 'src/utils/types/pagination-params';

@Controller('olympics')
export class OlympicsController {
  constructor(private readonly olympicsService: OlympicsService) {}

  @Post()
  create(@Body() createOlympicDto: CreateOlympicDto) {
    return this.olympicsService.create(createOlympicDto);
  }

  @Get()
  findAllSortedByYear(@Query() { offset, limit }: PaginationParams) {
    return this.olympicsService.findAllSortedByYear(offset, limit);
  }

  @Get('location')
  findAllSortedByLocation(@Param('id') id: string) {
    return this.olympicsService.findAllSortedByLocation(+id);
  }

  @Get('kind')
  findAllSortedByKind(@Param('id') id: string) {
    return this.olympicsService.findAllSortedByKind(+id);
  }

  @Get(':id/medals')
  findOneSortedByMedals(@Param('id') id: string) {
    return this.olympicsService.findOneSortedByMedals(+id);
  }

  @Get(':id/country')
  findOneSortedByCountryName(@Param('id') id: string) {
    return this.olympicsService.findOneSortedByCountryName(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOlympicDto: UpdateOlympicDto) {
    return this.olympicsService.update(+id, updateOlympicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.olympicsService.remove(+id);
  }
}
