import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoriesRepository } from '../../../shared/database/repositories/categories.repositories';

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepo: CategoriesRepository) {}
  findAllByUserId(userId: string) {
    return this.categoriesRepo.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
