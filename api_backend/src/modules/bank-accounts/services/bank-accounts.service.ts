import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';
import { UpdateBankAccountDto } from '../dto/update-bank-account.dto';

import { BankAccountsRepository } from '../../../shared/database/repositories/banck-accounts.repositories';
import { ValidateBankAccountOwnershipService } from './validate-bank-account-owership.service';

@Injectable()
export class BankAccountsService {
  constructor(
    private banckAccountRepo: BankAccountsRepository,
    private validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
  ) {}

  //CRIAÇÃO DAS BANCK-ACCOUNTS
  create(userId: string, createBankAccountDto: CreateBankAccountDto) {
    const { color, initialBalance, name, type } = createBankAccountDto;

    return this.banckAccountRepo.create({
      data: {
        userId,
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  //LISTAGEM POR USUARIOS DAS BANCK-ACCOUNTS
  async findAllByUserId(userId: string) {
    const bankAccounts = await this.banckAccountRepo.findMany({
      where: { userId },
      include: {
        transactions: {
          select: {
            type: true,
            value: true,
          },
        },
      },
    });
    return bankAccounts.map(({ transactions, ...bankAccounts }) => {
      const totalTransactions = transactions.reduce(
        (acc, transaction) =>
          acc +
          (transaction.type == 'INCOME'
            ? transaction.value
            : -transaction.value),
        0,
      );
      const currentBalance = bankAccounts.initialBalance + totalTransactions;

      return {
        ...bankAccounts,
        currentBalance,
        transactions,
      };
    });
  }

  async update(
    userId: string,
    banckAccountId: string,
    updateBankAccountDto: UpdateBankAccountDto,
  ) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      banckAccountId,
    );

    const { color, initialBalance, name, type } = updateBankAccountDto;

    return this.banckAccountRepo.update({
      where: { id: banckAccountId },
      data: {
        color,
        initialBalance,
        name,
        type,
      },
    });
  }

  async remove(userId: string, banckAccountId: string) {
    await this.validateBankAccountOwnershipService.validate(
      userId,
      banckAccountId,
    );
    return this.banckAccountRepo.delete({
      where: { id: banckAccountId },
    });
  }
}
