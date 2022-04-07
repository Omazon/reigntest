import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Query,
  Res,
} from '@nestjs/common';
import { NewsService } from './news.service';

import { ApiResponse } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('news')
export class NewsController {
  constructor(private newsServices: NewsService) {}

  @ApiResponse({
    status: 200,
    description:
      'Return message confirm, this endpoint read API News and save to own database, beside has cron for every hour',
  })
  @Get('/get-product-from-api')
  getNewsFromApi(@Res() res) {
    this.newsServices.getNewsFromAPI().subscribe((value) => {
      this.createNews(value);
      return res.status(HttpStatus.OK).json({
        message: 'save to DB',
      });
    });
  }

  async createNews(NewsDTO: any) {
    await this.newsServices.saveNews(NewsDTO);
  }

  @Get('/')
  @ApiImplicitQuery({ name: 'page', required: false })
  @ApiImplicitQuery({ name: 'limit', required: false })
  @ApiImplicitQuery({ name: 'author', required: false })
  @ApiImplicitQuery({ name: 'title', required: false })
  @ApiImplicitQuery({ name: 'tags', required: false })
  @ApiResponse({
    status: 200,
    description:
      'Return news from Database, you can filter using the fields above',
  })
  async getNews(
    @Res() res,
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('author') author?: string,
    @Query('title') story_title?: string,
    @Query('tags') tags?: string,
  ) {
    const news = await this.newsServices.getNews(
      page,
      limit,
      story_title,
      author,
      tags,
    );
    return res.status(HttpStatus.OK).json({
      news,
    });
  }

  @Delete('/delete')
  @ApiResponse({
    status: 200,
    description: 'Change isActive flag to false, return confirm message',
  })
  async deleteNews(@Res() res, @Query('productID') productID: number) {
    const news = await this.newsServices.deleteNews(productID);
    if (!news) throw new NotFoundException('News does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'news deleted',
    });
  }
}
