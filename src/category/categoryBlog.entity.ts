import { Blog } from 'src/blogs/blog.entity';
import {
  BaseEntity,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class CategoryBlog extends BaseEntity {
  @PrimaryColumn()
  blogId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => Blog, (blog: Blog) => blog.categoriesBlogs, {onDelete:'CASCADE'})
  @JoinColumn({ name: 'blogId' })
  blog: Blog;

  @ManyToOne(() => Category, (category: Category) => category.categoriesBlogs, {onDelete:'CASCADE'})
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
