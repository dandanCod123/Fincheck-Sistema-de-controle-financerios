import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../../shared/database/prisma.service';
import { UsersRepository } from '../../shared/database/repositories/users.repositories';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaService],
})
export class UsersModule {}
