import { Module } from '@nestjs/common';
import { BlogsModule } from './blogs/blogs.module';
// import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { config } from './config';
// import { TypeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TestModule } from './test/test.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule } from "@nestjs/config"
// import { Cloudinary } from './cloudinary';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    BlogsModule,
    AuthModule,
    UserModule,
    CategoryModule,
    TestModule,
    CloudinaryModule,
    ConfigModule.forRoot()
  ],
  controllers: [],
  // providers: [Cloudinary],
})
export class AppModule {}
