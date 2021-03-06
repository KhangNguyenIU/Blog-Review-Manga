import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  host: process.env.DB_HOSTNAME || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,

  ssl: true,

  extra: {
    ssl: {
      rejectUnauthorized: process.env.NODE_ENV!=="production",
    },
  },
  // ssl: process.env.NODE_ENV === 'production',
  // extra: process.env.NODE_ENV !== 'production' ?? {
  //   ssl: { rejectUnauthorized: false },
  // },
  entities: [`dist/**/**/*.entity{.ts,.js}`],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
