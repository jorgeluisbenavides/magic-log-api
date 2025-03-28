import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { UsersService } from './../services/users.service';
import { CreateOrUpdateUserDto } from '../dtos/CreateOrUpdateUserDto';

@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() bodyDto: CreateOrUpdateUserDto) {
    return this.userService.create(bodyDto);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreateOrUpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
