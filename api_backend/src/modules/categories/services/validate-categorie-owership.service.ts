import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '../../../shared/database/repositories/banck-accounts.repositories';

@Injectable()
export class ValidateCategoryOwnershipService {
  constructor(private categoriesRepo: BankAccountsRepository) {}

  async validate(userId: string, categoryId: string) {
    const isOwner = this.categoriesRepo.findFirst({
      where: { id: categoryId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Category not found');
    }
  }
}
