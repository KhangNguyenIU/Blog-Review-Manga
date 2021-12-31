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

  @Get('/total/page')
  getTotalBlogNumber() : Promise<Number> {
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
    @GetUser() user: User
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
