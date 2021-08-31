import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from 'src/config/typeorm.config';
import { BlogsController } from './blogs.controller';
import { BlogRepository } from './blog.repository';
import { BlogsService } from './blogs.service';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
