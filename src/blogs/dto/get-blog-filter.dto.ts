import {  IsInt, IsOptional, IsString } from "class-validator";

export class GetBlogFilterDto {
  @IsOptional()
  search: string;

  @IsOptional()
  @IsString()
  category: string;
  
  @IsOptional()
  page: number;

  @IsOptional()
  limit: number;

  @IsOptional()
  order: string
}
