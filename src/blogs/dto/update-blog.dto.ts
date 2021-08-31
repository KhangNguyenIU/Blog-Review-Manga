import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Category } from 'src/category/category.entity';

export class UpdateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  cover: string;

  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(200)
  exceprt: string;

  @IsNotEmpty()
  @MinLength(100)
  @MaxLength(10000)
  body: string;

  @IsNotEmpty()
  categories: Category[];
  
}
