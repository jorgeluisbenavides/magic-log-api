import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './users/entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'password',
  database: process.env.DB_NAME || 'mi_db',
  entities: [User],
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // No sincronizar automáticamente, siempre usar migraciones
  logging: true, // Activa los logs para ver las operaciones
});
