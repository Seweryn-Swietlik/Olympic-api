import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class ValidationService {
  throwIfNotExist<T>(id: number, entity: T) {
    if (!entity) {
      throw new NotFoundException(`No resource with id: ${id} has been found`);
    }
  }

  throwIfExist<T>(entity: T) {
    if (entity) {
      throw new ConflictException(
        `This entity has already existed in the database`,
      );
    }
  }
}
