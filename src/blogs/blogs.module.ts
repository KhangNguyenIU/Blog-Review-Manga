import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsController } from './blogs.controller';
import { BlogRepository } from './blog.repository';
import { BlogsService } from './blogs.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogRepository]), CloudinaryModule],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
