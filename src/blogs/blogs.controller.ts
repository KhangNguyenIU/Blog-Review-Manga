import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
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

  @Post()
  @UseGuards(AuthGuard('jwt'))
  createBlog(
    @Body(ValidationPipe) creatBlogDto: CreateBlogDto,
    @GetUser() user: User,
  ): Promise<Blog> {
    return this.blogsService.createBlog(creatBlogDto, user);
  }

  @Get()
  getBlogs(
    @Query(ValidationPipe) getBlogFilterDto: GetBlogFilterDto,
  ): Promise<Blog[]> {
    return this.blogsService.getBlogs(getBlogFilterDto);
  }

  @Get('/:id')
  getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
    return this.blogsService.getBlogById(id);
  }

  @Patch('/:id')
  updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateBlogDto: UpdateBlogDto,
  ): Promise<Blog> {
    return this.blogsService.updateBlog(updateBlogDto, id);
  }

  @Delete('/:id')
  deleteBlog(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.blogsService.deleteBlog(id);
  }
}
