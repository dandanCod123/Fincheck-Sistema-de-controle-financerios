import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/signin';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup';

@Injectable()
export class AuthService {
  constructor(
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async autheticate(authencateDto: SigninDto) {
    const { email, password } = authencateDto;
    const user = await this.usersRepository.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credetials');
    }

    const isPasswodIsValid = await compare(password, user.password);

    if (!isPasswodIsValid) {
      throw new UnauthorizedException('Invalid password');
    }

    //JWT
    const accessToken = await this.generateAcessToken(user.id);

    return { user, accessToken };
  }

  async signup(signupDto: SignUpDto) {
    const emailExists = await this.usersRepository.findUnique({
      where: {
        email: signupDto.email,
      },
    });

    if (emailExists) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await hash(signupDto.password, 12);

    const user = await this.usersRepository.create({
      data: {
        name: signupDto.name,
        email: signupDto.email,
        password: hashedPassword,
        categories: {
          createMany: {
            data: [
              //INCOME
              {
                name: 'Salario',
                icon: 'travel',
                type: 'INCOME',
              },
              {
                name: 'Freelance',
                icon: 'free-lance',
                type: 'INCOME',
              },
              {
                name: 'Outro',
                icon: 'outro',
                type: 'INCOME',
              },
              //EXPENSES
              {
                name: 'Casa',
                icon: 'home',
                type: 'EXPENSE',
              },
              {
                name: 'Alimentação',
                icon: 'food',
                type: 'EXPENSE',
              },
            ],
          },
        },
      },
    });
    return user;
  }

  private generateAcessToken(userId: string) {
    return this.jwtService.signAsync({ sub: userId });
  }
}
