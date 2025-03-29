import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';

import { UsersService } from './../services/users.service';
import { CreateOrUpdateUserDto } from '../dtos/CreateOrUpdateUserDto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() bodyDto: CreateOrUpdateUserDto) {
    return this.userService.create(bodyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreateOrUpdateUserDto) {
    return this.userService.update(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
