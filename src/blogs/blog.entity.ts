import { Category } from 'src/category/category.entity';
import { CategoryBlog } from 'src/category/categoryBlog.entity';
import { User } from 'src/user/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  cover: string;

  @Column()
  exceprt: string;

  @Column()
  body: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne((type) => User, (user) => user.blogs, { eager: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  // @Column()
  // userId: number;

  @OneToMany(
    () => CategoryBlog,
    (categoryBlog: CategoryBlog) => categoryBlog.blog,
  )
  categoriesBlogs: CategoryBlog[];
}
