import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AuthModule } from 'src/auth/auth.module';
import { UsersService } from './services/users.service';
import { AuthService } from 'src/auth/services/auth.service';
import { UsersController } from './controllers/users.controller';
import { User } from './entities/user.entity';

@Module({
  imports: [
    // forwardRef(() => AuthModule),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [
    UsersService,
    // AuthService
  ],
  controllers: [UsersController],
  exports: [
    UsersService,
    TypeOrmModule,
    TypeOrmModule,
  ]
})
export class UsersModule { }
