import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateOrUpdateProductDto } from '../dto/CreateOrUpdateProductDto';
import { ProductMapper } from 'src/mappers/productMapperDto';
import { ResponseProductDto } from '../dto/ResponseProductDto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async create(id: number, body: CreateOrUpdateProductDto): Promise<ResponseProductDto> {
    try {
      const user = await this.userRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('Usuario no encontrado')

      const product = await this.productRepository.create({ ...body, user } as DeepPartial<Product>);

      const addedProduct = await this.productRepository.save(product);

      return ProductMapper.toResponseDto(addedProduct);
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException('El sku ya está en uso');
      }
      throw new InternalServerErrorException('Error al crear el producto');
    }
  }

  async getUserWithProducts(id: number): Promise<ResponseProductDto[]> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['products'],
    });

    if (!user) return [];

    return ProductMapper.toResponseDtoList(user.products);
  }

  async getProductsByParams(params: {
    sku?: string;
    name?: string;
    userId?: number;
    minPrice?: number;
    maxPrice?: number;
  }): Promise<ResponseProductDto[]> {
    console.log('getProductsByParams::', params)
    const { sku = '', name = '', userId = 0, minPrice = 0, maxPrice = 0 } = params;
    const query = this.productRepository.createQueryBuilder('product');

    if (sku !== '') {
      query.andWhere('product.sku = :sku', { sku });
    }

    if (name !== '') {
      query.andWhere('product.name ILIKE :name', { name: `%${name}%` });
    }

    if (userId > 0) {
      query.andWhere('product.userId = :userId', { userId });
    }

    if (minPrice > 0) {
      query.andWhere('product.price >= :minPrice', { minPrice });
    }

    if (maxPrice > 0) {
      query.andWhere('product.price <= :maxPrice', { maxPrice });
    }

    const products = await query.getMany();

    return ProductMapper.toResponseDtoList(products);
  }
}
