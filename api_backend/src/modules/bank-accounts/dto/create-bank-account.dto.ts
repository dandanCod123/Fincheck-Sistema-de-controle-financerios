import {
  IsEnum,
  IsHexColor,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { BanckAccountType } from '../entities/BankAccount';

export class CreateBankAccountDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNumber()
  @IsNotEmpty()
  initialBalance!: number;

  @IsNotEmpty()
  @IsEnum(BanckAccountType)
  type!: BanckAccountType;

  @IsString()
  @IsNotEmpty()
  @IsHexColor()
  color!: string;
}
