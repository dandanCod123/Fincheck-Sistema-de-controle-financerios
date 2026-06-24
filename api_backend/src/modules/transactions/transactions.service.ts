import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { TransactionsRepository } from 'src/shared/database/repositories/transactions.repositores';
import { ValidateBankAccountOwnershipService } from '../bank-accounts/services/validate-bank-account-owership.service';
import { ValidateCategoryOwnershipService } from '../categories/services/validate-categorie-owership.service';
import { TransactionType } from './entities/Transactions';

@Injectable()
export class TransactionsService {
  constructor(
    private trasactionsRepo: TransactionsRepository,
    private validateBankAccountOwnershipService: ValidateBankAccountOwnershipService,
    private validateCategoryOwnershipService: ValidateCategoryOwnershipService,
  ) {}

  async create(userId: string, createTransactionDto: CreateTransactionDto) {
    const { bankAccountId, categoryId, date, type, value, name } =
      createTransactionDto as CreateTransactionDto & {
        bankAccountId: string;
        categoryId: string;
      };

    await this.validateEntitiesOwnerShip({
      userId,
      bankAccountId,
      categoryId,
    });
    return this.trasactionsRepo.create({
      data: {
        userId,
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  findAllByUserId(
    userId: string,
    filters: {
      month: number;
      year: number;
      bankAccountId?: string;
      type?: TransactionType;
    },
  ) {
    return this.trasactionsRepo.findMany({
      where: {
        userId,
        bankAccountId: filters.bankAccountId,
        type: filters.type,
        date: {
          gte: new Date(Date.UTC(filters.year, filters.month)),
          lt: new Date(Date.UTC(filters.year, filters.month + 1)),
        },
      },
    });
  }

  async update(
    userId: string,
    transactionId: string,
    updateTransactionDto: UpdateTransactionDto,
  ) {
    const { bankAccountId, categoryId, date, name, type, value } =
      updateTransactionDto;
    await this.validateEntitiesOwnerShip({
      userId,
      bankAccountId,
      categoryId,
      transactionId,
    });
    return this.trasactionsRepo.update({
      where: { id: transactionId },
      data: {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      },
    });
  }

  async remove(userId: string, transactionId: string) {
    await this.validateEntitiesOwnerShip({ userId, transactionId });

    await this.trasactionsRepo.delete({
      where: { id: transactionId },
    });

    return null;
  }

  // VALIDAÇÃO DAS TRANSACTIONS
  private async validateEntitiesOwnerShip({
    userId,
    bankAccountId,
    categoryId,
    transactionId,
  }: {
    userId: string;
    bankAccountId?: string;
    categoryId?: string;
    transactionId?: string;
  }) {
    await Promise.all([
      transactionId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          transactionId,
        ),
      bankAccountId &&
        this.validateBankAccountOwnershipService.validate(
          userId,
          bankAccountId,
        ),
      categoryId &&
        this.validateCategoryOwnershipService.validate(userId, categoryId),
    ]);
  }
}
