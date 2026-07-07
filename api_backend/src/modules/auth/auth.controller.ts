import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup';
import { IsPublic } from '../../shared/decorators/IsPublic';
import { SigninDto } from './dto/signin';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic() // 👈 libera
  @Post('signin')
  @SetMetadata('IS_PUBLIC_KEY', true)
  signin(@Body() signinDto: SigninDto) {
    return this.authService.autheticate(signinDto);
  }

  @IsPublic() // 👈 libera
  @Post('signup')
  create(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }
}
