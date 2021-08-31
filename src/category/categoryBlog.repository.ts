import { EntityRepository, Repository } from 'typeorm';
import { CategoryBlog } from './categoryBlog.entity';

@EntityRepository(CategoryBlog)
export class CategoryBlogRepository extends Repository<CategoryBlog> {
    
}
