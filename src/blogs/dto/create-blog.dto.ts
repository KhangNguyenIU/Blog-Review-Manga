import { IsArray, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { Category } from 'src/category/category.entity';

export class CreateBlogDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  cover: string;

  // @IsNotEmpty()
  // @MinLength(10)
  // @MaxLength(200)
  exceprt: string;

  @IsNotEmpty()
  body: any;


  categories: number[];

}
