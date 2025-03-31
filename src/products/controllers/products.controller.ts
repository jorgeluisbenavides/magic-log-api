import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateOrUpdateProductDto } from '../dto/CreateOrUpdateProductDto';
import { ProductsService } from '../services/products.service';
import { AuthGuard } from '@nestjs/passport';
import { ResponseProductDto } from '../dto/ResponseProductDto';

@Controller('api/products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Request() req, @Body() bodyDto: CreateOrUpdateProductDto) {
    const { id } = req.user;

    return this.productService.create(id, bodyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(
    @Param('id') productId: number,
    @Body() bodyDto: CreateOrUpdateProductDto,
  ) {
    return this.productService.update(productId, bodyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user')
  getUserWithProducts(@Request() req) {
    const { id } = req.user;

    return this.productService.getUserWithProducts(id);
  }

  @Get()
  async getProductsByParams(
    @Query('sku') sku?: string,
    @Query('name') name?: string,
    @Query('userId') userId?: number,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
  ): Promise<ResponseProductDto[]> {
    return this.productService.getProductsByParams({
      sku,
      name,
      userId: userId ? Number(userId) : 0,
      minPrice: minPrice ? Number(minPrice) : 0,
      maxPrice: maxPrice ? Number(maxPrice) : 0,
    });
  }
}
