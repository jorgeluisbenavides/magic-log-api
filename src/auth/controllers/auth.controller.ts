import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    return this.authService.validateUser(loginDto.email, loginDto.password)
      .then(user => this.authService.login(user));
  }
}
