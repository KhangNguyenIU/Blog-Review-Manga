// import { Injectable } from '@nestjs/common';
// import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
// // import { ConfigService } from '@nestjs/config';

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

// @Injectable()
// export class TypeOrmConfig implements TypeOrmOptionsFactory {
//   constructor(private configService: ConfigService) {}

//   createTypeOrmOptions() {
//     return this.configService.get('database');
//   }
// }

const dbConfig = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE || dbConfig.type,
  host: process.env.DB_HOSTNAME || dbConfig.host,
  port: process.env.DB_PORT || dbConfig.port,
  username: process.env.DB_USERNAME || dbConfig.username,
  password: process.env.DB_PASSWORD || dbConfig.password,
  database: process.env.DB_DATABASE || dbConfig.database,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  entities: [`dist/**/**/*.entity{.ts,.js}`],
  synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
};
