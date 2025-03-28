import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'magiclog_api',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
      retryDelay: 3000,
      retryAttempts: 10
    }),
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
