import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DeepPartial, Repository } from 'typeorm';
import { CreateOrUpdateProductDto } from '../dto/CreateOrUpdateProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async create(req, body: CreateOrUpdateProductDto) {
    try {
      const { id } = req.user;
      const product = await this.productRepository.create({ ...body, userId: id } as DeepPartial<Product>);

      return await this.productRepository.save(product);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('El sku ya está en uso');
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }
}
