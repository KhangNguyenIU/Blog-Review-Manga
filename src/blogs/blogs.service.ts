import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Blog } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogFilterDto } from './dto/get-blog-filter.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(BlogRepository)
    private blogRepository: BlogRepository,
  ) {}

  async getBlogs(getBlogFilterDto: GetBlogFilterDto): Promise<Blog[]> {
    const blogs = await this.blogRepository.getBlogs(getBlogFilterDto);
    if (!blogs) {
      throw new NotFoundException();
    }
    return blogs;
  }

  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ id });
    if (!blog) {
      throw new NotFoundException(`Blog with id: ${id} is not found!`);
    }

    return blog;
  }

  async createBlog(createBlogDto: CreateBlogDto, user: User): Promise<Blog> {
    const result = await this.blogRepository.createBlog(createBlogDto, user);
    if (!result) {
      throw new NotImplementedException(
        "Your blog haven't been saved, please try again",
      );
    }
    return result;
  }

  async updateBlog(updateBlogDto: UpdateBlogDto, id: number): Promise<Blog> {
    return this.blogRepository.updateBlog(updateBlogDto, id);
  }

  async deleteBlog(id: number): Promise<string> {
    const result = await this.blogRepository.delete({ id });
    if (result.affected == 0) {
      throw new NotFoundException(`Blog with id: ${id} is not existed`);
    }
    const message = 'Delete blog successfully';
    return message;
  }
}
