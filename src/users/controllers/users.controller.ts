import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';

import { UsersService } from './../services/users.service';

@Controller('api/users')
export class UsersController {

  constructor (private userService: UsersService){}

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  getOne(@Param('id')id: number) {
    return this.userService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.userService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.userService.update(id, body);;
  }

  @Delete(':id')
  delete(@Param('id')id: number) {
    return this.userService.delete(id);
  }
}
