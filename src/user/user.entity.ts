import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Blog } from 'src/blogs/blog.entity';

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  avatar: string;

  @Column()
  bias: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  role: number;
  
  @OneToMany((type) => Blog, (blog) => blog.user, { eager: true })
  blogs: Blog[];

  async validateUserPassword(password: string): Promise<Boolean> {
    const hashedPassword = await bcrypt.hash(password, this.salt);
    return (this.password = hashedPassword);
  }
}
