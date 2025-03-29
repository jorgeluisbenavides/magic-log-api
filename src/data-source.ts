import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Purchase } from './purchases/entities/purchase.entity';
import { PurchaseProduct } from './purchases/entities/purchaseProduct.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'mi_db',
  entities: [
    User,
    Product,
    Purchase,
    PurchaseProduct,
  ],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
