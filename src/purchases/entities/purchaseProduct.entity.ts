import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('purchase_products')
export class PurchaseProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseProducts)
  purchase: Purchase;

  @ManyToOne(() => Product, (product) => product.purchaseProducts)
  product: Product;
}