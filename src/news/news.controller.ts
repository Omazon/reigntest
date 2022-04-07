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
import { NewsDto } from './dtos/news.dto';

@Controller('news')
export class NewsController {
  constructor(private newsServices: NewsService) {}

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
  async deleteNews(@Res() res, @Query('productID') productID: number) {
    const news = await this.newsServices.deleteNews(productID);
    if (!news) throw new NotFoundException('News does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'news deleted',
    });
  }
}
