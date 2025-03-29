import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { AuthController } from './controllers/auth.controller';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategies';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    //forwardRef(() => UsersModule),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' }
    }),
  ],
  providers: [AuthService, UsersService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
