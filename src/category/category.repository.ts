import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { name, description } = createCategoryDto;

    const category = new Category();
    (category.name = name), (category.description = description);
    try {
      await category.save();
      return category;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
