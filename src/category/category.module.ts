import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryBlogRepository } from './categoryBlog.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepository, CategoryBlogRepository]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
