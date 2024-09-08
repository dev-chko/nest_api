import { DataSource, Migration } from 'typeorm';
import * as path from 'path';

const baseConfig = {
  synchronize: false,
  migrations: [path.join(__dirname, `../migrations/*.{ts,js}`)],
};

console.log('process.env :>> ', process.env);

let dbConfig: any;
switch (process.env.NODE_ENV) {
  case 'development':
    dbConfig = {
      ...baseConfig,
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [path.join(__dirname, '**/*.entity.{ts,js}')],
    };
    break;

  case 'test':
    dbConfig = {
      ...baseConfig,
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [path.join(__dirname, '**/*.entity.ts')],
      migrationsRun: true,
    };
    break;

  case 'production':
    dbConfig = {
      ...baseConfig,
      type: 'postgres',
      host: process.env.DB_HOST,
      username: process.env.USERNAME,
      port: process.env.PORT,
      password: process.env.PASSWORD,
      migrationsRun: true,
      entities: [path.join(__dirname, '**/*.entity.{ts,js}')],
    };
    break;

  default:
    throw new Error('Unknown environment');
}

export const AppDataSource = new DataSource(dbConfig);
