import { Module } from '@nestjs/common';
import { PurchasesController } from './controllers/purchases.controller';
import { PurchasesService } from './services/purchases.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { PurchaseProduct } from './entities/purchaseProduct.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      PurchaseProduct,
      Product,
      User,
    ])
  ],
  controllers: [PurchasesController],
  providers: [PurchasesService]
})
export class PurchasesModule { }
