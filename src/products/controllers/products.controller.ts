import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateOrUpdateProductDto } from '../dto/CreateOrUpdateProductDto';
import { ProductsService } from '../services/products.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/products')
export class ProductsController {

  constructor(private productService: ProductsService) { }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() bodyDto: CreateOrUpdateProductDto) {
    return this.productService.create(req, bodyDto);
  }
}
