import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  bankAccountId!: string; // ✅ era "banckAccountId"

  @IsString()
  @IsNotEmpty()
  @IsUUID()
  categoryId!: string; // ✅ era "categorytId"

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  value!: number;

  @IsDateString()
  date!: string;

  @IsEnum(TransactionType)
  type!: TransactionType;
}
