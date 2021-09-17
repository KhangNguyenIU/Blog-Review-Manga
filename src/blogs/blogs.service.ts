import {
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  UploadResponseCallback,
} from 'cloudinary';
import { log } from 'console';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { User } from 'src/user/user.entity';
import { blobToBase64, isBase64Image } from 'src/utilities/handleImageUrl';
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

  async getBlogById(id: number): Promise<Blog> {
    const blog = await this.blogRepository.findOne({ id });
    if (!blog) {
      throw new NotFoundException(`Blog with id: ${id} is not found!`);
    }

    return blog;
  }

//   async createBlog(createBlogDto: CreateBlogDto, user: User): Promise<Blog> {
//     const result = await this.blogRepository.createBlog(createBlogDto, user);
//     if (!result) {
//       throw new NotImplementedException(
//         "Your blog haven't been saved, please try again",
//       );
//     }
//     return result;
//   }

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

  async createBlog(
    createBlogDto: CreateBlogDto,
	user:User
  ): Promise<Blog> {
    const { title, cover, body, exceprt } = createBlogDto;

    let blog = new Blog();
	createBlogDto.categories =[8]
    if (isBase64Image(cover)) {
      const uploadedImage: any = await this.cloudinaryService.uploadImage(
        cover,
      );
      createBlogDto.cover = uploadedImage.url;
    } else {
      createBlogDto.cover = cover;
    }

    let content = JSON.parse(body);

    var arrayMap = await Promise.all(
      content.blocks.map(async (block, index) => {
        if (block.type === 'image') {
          const image: any = await this.cloudinaryService.uploadImage(
            block.data.url,
          );
          // console.log({image})
          content.blocks[index].data.url = image.secure_url;
        }
      }),
    );
    createBlogDto.body = JSON.stringify(content);
    // console.log(createBlogDto);
    const result =  await this.blogRepository.createBlog(createBlogDto, user)
	if(!result)
	  throw new NotImplementedException('Error in saving blog')
	return result
  }
}
