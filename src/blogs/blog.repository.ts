import { NotFoundException, NotImplementedException } from '@nestjs/common';
import { Category } from 'src/category/category.entity';
import { CategoryBlog } from 'src/category/categoryBlog.entity';
import { User } from 'src/user/user.entity';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogDto } from './dto/create-blog.dto';
import { GetBlogFilterDto } from './dto/get-blog-filter.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@EntityRepository(Blog)
export class BlogRepository extends Repository<Blog> {
  async getBlogs(getBlogsFilterDto: GetBlogFilterDto): Promise<Blog[]> {
    const { search, limit, page, order } = getBlogsFilterDto;
    const take = isNaN(limit) ? 10 : Number(limit);
    const skip = isNaN(page) ? 0 : Number(page);
    //console.log({ search, take, skip }, typeof take, typeof skip);

    const query = this.createQueryBuilder('blog');

    if (search) {
      query.where(
        'LOWER(blog.title) LIKE LOWER(:search) OR LOWER(blog.body) LIKE LOWER(:search) OR LOWER(blog.exceprt) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }
    if (take && skip) {
      query.take(take).skip(skip);
    }

    if (order) {
      query.orderBy(order);
    }

    const blogs = await query.getMany();
    return blogs;
  }

  async createBlog(createBlogDto: CreateBlogDto, user: User): Promise<Blog> {
    const { title, cover, exceprt, body } = createBlogDto;
    const { categories } = createBlogDto;
    const categoriesList = categories.map((x) => Number(x));

    const query = getRepository(Category).createQueryBuilder('category')
    const categoryList = await query
      .where('category.id IN (:...cates)', { cates: categoriesList })
      .getMany();

    const blog = new Blog();
    blog.title = title;
    blog.cover = cover;
    blog.body = body;
    blog.exceprt = exceprt;

    blog.user = user;
    await blog.save();
    for (const cate of categoryList) {
      const cateblog = new CategoryBlog();
      cateblog.blog = blog;
      cateblog.category = cate;
      await cateblog.save();
    }
    await delete blog.user;

    return blog;
  }

  async updateBlog(updateBlogDto: UpdateBlogDto, id: number): Promise<Blog> {
    const { title, cover, exceprt, body, categories } = updateBlogDto;
    const blog = await this.findOne({ id });
    if (!blog) {
      throw new NotFoundException(`Blog with id: ${id} is not existed`);
    }
    blog.title = title;
    blog.cover = cover;
    blog.exceprt = exceprt;
    blog.body = body;

    // blog.updated_at = Date.now();
    try {
      await blog.save();
      return blog;
    } catch (error) {
      throw new NotImplementedException(
        'Your execution is not done, please try again',
      );
    }
  }
}
