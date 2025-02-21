import { DataSourceOptions } from 'typeorm';
import {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USERNAME,
  NODE_ENV,
} from '../env';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: DATABASE_HOST,
  port: parseInt(DATABASE_PORT),
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  entities: [__dirname + '/../../domains/**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/../../domains/database/migrations/*.{js,ts}'],
  synchronize: NODE_ENV === 'local',
  migrationsRun: false,
  logging: NODE_ENV === 'local',
};
