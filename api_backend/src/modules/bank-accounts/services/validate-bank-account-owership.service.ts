import { Injectable, NotFoundException } from '@nestjs/common';

import { BankAccountsRepository } from '../../../shared/database/repositories/banck-accounts.repositories';

@Injectable()
export class ValidateBankAccountOwnershipService {
  constructor(private banckAccountRepo: BankAccountsRepository) {}

  async validate(userId: string, banckAccountId: string) {
    const isOwner = this.banckAccountRepo.findFirst({
      where: { id: banckAccountId, userId },
    });

    if (!isOwner) {
      throw new NotFoundException('Bank account not found');
    }
  }
}
