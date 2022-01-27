import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Blog } from './blog.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogFilterDto } from './dto/get-blog-filter.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  @Get()
  getBlogs(
    @Query(ValidationPipe) getBlogFilterDto: GetBlogFilterDto,
  ): Promise<Blog[]> {
    return this.blogsService.getBlogs(getBlogFilterDto);
  }

  // @Get('/:id')
  // getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
  //   return this.blogsService.getBlogById(id);
  // }

  @Get('/:slug')
  getBlogBySlug(@Param('slug') slug: string): Promise<Blog> {
    return this.blogsService.getBlogBySlug(slug);
  }

  @Get('/cate/:category')
  getBlogsByCategory(@Param('category') category: number): Promise<Blog[]>{
    return this.blogsService.getBlogByCategory(category)
  }


  @Get('/total/page')
  getTotalBlogNumber(): Promise<Number> {
    return this.blogsService.getNumberOfBlogs();
  }

  @Patch('/:id')
  updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogsService.updateBlog(updateBlogDto, id);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteBlog(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<string> {
    return this.blogsService.deleteBlog(id, user);
  }

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  upBlob(
    @Body(ValidationPipe) createBlogDto: CreateBlogDto,
    @GetUser() user: User,
  ): Promise<Blog> {
    return this.blogsService.createBlog(createBlogDto, user);
  }
}
