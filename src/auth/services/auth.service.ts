import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserMapper } from 'src/mappers/userMapperDto';
import { ResponseUserDto } from 'src/users/dtos/ResponseUserDto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<ResponseUserDto> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return UserMapper.toResponseDto(user);
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }

  async login(user: ResponseUserDto) {
    return {
      access_token: this.jwtService.sign(user),
      user,
    };
  }
}
