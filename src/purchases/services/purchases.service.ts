import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ResponseUserDto } from 'src/users/dtos/ResponseUserDto';
import { RequestProductIdsDto } from '../dto/RequestProductIdsDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import { DeepPartial, In, Repository } from 'typeorm';
import { PurchaseProduct } from '../entities/purchaseProduct.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class PurchasesService {

  constructor(
    @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,
    @InjectRepository(PurchaseProduct) private purchaseProductRepository: Repository<PurchaseProduct>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) { }

  async create(userDto: ResponseUserDto, bodyDto: RequestProductIdsDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: userDto.id } });
      if (!user) throw new NotFoundException('Usuario no encontrado')

      const prePurchase = await this.purchaseRepository.create({ user });
      const purchase = await this.purchaseRepository.save(prePurchase);

      const productIds = bodyDto.product_ids.map(productid => productid.id);

      const products = await this.productRepository.findBy({ id: In(productIds) });
      if (products.length !== productIds.length) {
        throw new NotFoundException('Algunos productos no existen');
      }

      const purchaseProducts = bodyDto.product_ids.map((product) => {
        const foundProduct = products.find(p => p.id === product.id);
        if (!foundProduct) return null;

        return this.purchaseProductRepository.create({
          purchase,
          product: foundProduct,
          quantity: product.quantity,
        } as DeepPartial<PurchaseProduct>);
      }).filter(Boolean);

      this.purchaseProductRepository.save(purchaseProducts as PurchaseProduct[]);

      return { message: 'Compra creada con éxito', purchase };
    } catch (err) {
      throw new InternalServerErrorException(`Error al crear la compra: ${err.message}`);
    }
  }
}
