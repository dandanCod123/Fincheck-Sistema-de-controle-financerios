import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup';
import { IsPublic } from 'src/shared/decorators/IsPublic';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic() // 👈 libera
  @Post('signin')
  @SetMetadata('IS_PUBLIC_KEY', true)
  signin(@Body() signinDto: SignUpDto) {
    return this.authService.autheticate(signinDto);
  }

  @IsPublic() // 👈 libera
  @Post('signup')
  create(@Body() signupDto: SignUpDto) {
    return this.authService.signup(signupDto);
  }
}
