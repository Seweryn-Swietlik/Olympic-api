# Olympic-api

The application allows you to create your own tables with results from the Olympiads

## The application allows you to:

1. Create, read, update, delete for the Olympics:

```javascript
class CreateOlympicDto {
  year: number; //the year the Olympics were organized

  kind: 'winter' | 'summer'; //kind of Olympics

  location: string; //the place where the olympiad was organized
}
```

```javascript
  findAllSortedByLocation(offset?: number, limit?: number) {
    return this.olympicsRepository.find({
      relations: ['result', 'result.country', 'result.medals'],
      order: { location: 'DESC' },
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
```

2. Uploading a picture of the flag. And create, read, update, delete for the country.

```javascript
class CreateCountryDto {
  name: string; //Country name
}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createCountryDto: CreateCountryDto,
  ) {
    const imageUrl = await this.googleDriveService.generateImageUrl(image);
    return this.countriesService.create(createCountryDto, imageUrl);
  }
```

```javascript
  findAll(offset?: number, limit?: number) {
    return this.countriesRepository.find({
      relations: ['result', 'result.olympic', 'result.medals'],
      order: { name: 'DESC' },
      skip: offset,
      take: limit,
    });
  }
```

3. Create, read, update, delete for the results of the Olympics

```javascript
class CreateResultDto {
  countryId: string; //country id

  olympicId: string; //olympic Id

  medals: CreateMedalsDto; //medals won
}

class CreateMedalsDto {
  gold: number;

  silver: number;

  brown: number;
}
```

```javascript
  findAllSortedByMedals(offset?: number, limit?: number) {
    return this.resultsRepository.find({
      relations: ['country', 'olympic'],
      order: { medals: { gold: 'DESC', silver: 'DESC', brown: 'DESC' } },
      skip: offset,
      take: limit,
    });
  }
```

4. Each listing has pagination

```javascript
export class PaginationParams {
  offset?: number;

  limit?: number;
}
```

```javascript
  findAllSortedByMedals(offset?: number, limit?: number) {
    return this.resultsRepository.find({
      relations: ['country', 'olympic'],
      order: { medals: { gold: 'DESC', silver: 'DESC', brown: 'DESC' } },
      skip: offset,
      take: limit,
    });
  }
```

5. ERD schema was generated in pgAdmin
   https://i.imgur.com/8Vf3NEf.png

6. Docker images for the application and database have been put up (Images build correctly but there was a problem with the connection to the database which was not solved for lack of enough time)
