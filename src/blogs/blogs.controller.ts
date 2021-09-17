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
  Req,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/user/user.entity';
import { Blog } from './blog.entity';
import { BlogsService } from './blogs.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogFilterDto } from './dto/get-blog-filter.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { Observable, of } from 'rxjs';
import path from 'path';
import { Request } from 'express';
import { isBase64Image } from 'src/utilities/handleImageUrl';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
@Controller('blogs')
export class BlogsController {
  constructor(private blogsService: BlogsService) {}

  // @Post()
  // // @UseGuards(AuthGuard('jwt'))
  // createBlog(
  //   @Body(ValidationPipe) creatBlogDto: CreateBlogDto,
  //   @GetUser() user: User,
  // ): Promise<Blog> {
  //   return this.blogsService.createBlog(creatBlogDto, user);
  // }

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

  @Post('/')
  @UseGuards(AuthGuard('jwt'))
  upBlob(
    @Body(ValidationPipe) createBlogDto: CreateBlogDto,
    @GetUser() user: User,
  ): Promise<Blog> {
    // console.log({user})
    return this.blogsService.createBlog(createBlogDto, user);
  }
}
