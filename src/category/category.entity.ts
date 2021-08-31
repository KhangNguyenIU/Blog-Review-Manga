import { Blog } from 'src/blogs/blog.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { CategoryBlog } from './categoryBlog.entity';

@Entity()
@Unique(['name'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany(
    () => CategoryBlog,
    (categoryBlog: CategoryBlog) => categoryBlog.category,
  )
  categoriesBlogs: CategoryBlog[];
}
