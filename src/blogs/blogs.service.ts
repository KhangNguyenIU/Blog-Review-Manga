import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/user/user.entity';
import { isBase64Image } from 'src/utilities/handleImageUrl';
import { exceprtCut } from 'src/utilities/handleString';
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
    private cloudinaryService: CloudinaryService,
  ) {}

  async getBlogs(getBlogFilterDto: GetBlogFilterDto): Promise<Blog[]> {
    const blogs = await this.blogRepository.getBlogs(getBlogFilterDto);
    if (!blogs) {
      throw new NotFoundException();
    }
    return blogs;
  }

  async getNumberOfBlogs(): Promise<Number> {
    const blogs = await this.blogRepository.getTotalBlogsLength();
    if (!blogs) {
      throw new NotImplementedException();
    }
    return blogs;
  }
  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.getBlogById(id);
    if (!blog) {
      throw new NotFoundException(`Blog with id: ${id} is not found!`);
    }

    return blog;
  }

  async getBlogByCategory(category: number): Promise<Blog[]> {
    const blogs = await this.blogRepository.getBlogByCategory(category);
    if (!blogs || !blogs.length) throw new NotFoundException();
    return blogs;
  }
  async getBlogBySlug(slug: string): Promise<Blog> {
    const blog = await this.blogRepository.getBlogBySlug(slug);
    if (!blog) {
      throw new NotFoundException(`Blog with slud: ${slug} is not found`);
    }
    return blog;
  }

  async updateBlog(updateBlogDto: UpdateBlogDto, id: number): Promise<Blog> {
    return this.blogRepository.updateBlog(updateBlogDto, id);
  }

  async deleteBlog(id: number, user: User): Promise<string> {
    const existedBlog = await this.getBlogById(id);
    if (existedBlog.user.id !== user.id) {
      throw new ConflictException('Unauthorized for this action');
    }
    const result = await this.blogRepository.delete({ id });
    if (result.affected == 0) {
      throw new NotFoundException(`Blog with id: ${id} is not existed`);
    }
    const message = 'Delete blog successfully';
    return message;
  }

  async createBlog(createBlogDto: CreateBlogDto, user: User): Promise<Blog> {
    const { title, cover, body, categories } = createBlogDto;

    let blog = new Blog();
    if (isBase64Image(cover)) {
      const uploadedImage: any = await this.cloudinaryService.uploadImage(
        cover,
      );
      createBlogDto.cover = uploadedImage.url;
    } else {
      createBlogDto.cover = cover;
    }

    let content = body;
    let exceprt: string = exceprtCut(content.blocks);
    var arrayMap = await Promise.all(
      content.blocks.map(async (block, index) => {
        if (block.type === 'image') {
          const image: any = await this.cloudinaryService.uploadImage(
            block.data.url,
          );
          console.log({ image });
          content.blocks[index].data.url = image.secure_url;
        }
      }),
    );

    createBlogDto.exceprt = exceprt;
    createBlogDto.body = content;
    // console.log(createBlogDto);
    const result = await this.blogRepository.createBlog(createBlogDto, user);
    if (!result) throw new NotImplementedException('Error in saving blog');
    return result;
  }
}
