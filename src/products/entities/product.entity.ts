import { PurchaseProduct } from 'src/purchases/entities/purchaseProduct.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, OneToMany } from 'typeorm';

@Entity('products')
@Unique(['sku'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', nullable: false })
  price: number;

  @Column({ default: true })
  active: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.products)
  user: User;

  @OneToMany(() => PurchaseProduct, (purchaseProduct) => purchaseProduct.product)
  purchaseProducts: PurchaseProduct[];
}
