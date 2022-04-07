import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { News } from './interfaces/news.interface';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class NewsService {
  private readonly logger = new Logger(NewsService.name);
  constructor(
    private httpService: HttpService,
    @InjectModel('News') private newsModel: Model<News>,
  ) {}
  @Cron(CronExpression.EVERY_HOUR)
  getNewsFromAPI(): Observable<AxiosResponse<any>> {
    console.log('get cada 5');
    return this.httpService
      .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
      .pipe(map((response) => response.data));
  }

  async getNews(
    page = 1,
    limit = 5,
    story_title = null,
    author = null,
    tags = null,
  ): Promise<News[]> {
    const filters = {
      author: { $regex: author },
      story_title: { $regex: story_title },
      _tags: { $regex: tags },
      isActive: true,
    };
    //delete null values
    Object.keys(filters).forEach((key) => {
      if (filters[key].$regex === null) {
        delete filters[key];
      }
    });
    //with this we can use any order for URL params
    if (author || story_title || tags) {
      return this.newsModel
        .find(filters)
        .skip((page - 1) * limit)
        .limit(limit);
    } else {
      return this.newsModel
        .find({ isActive: true })
        .skip((page - 1) * limit)
        .limit(limit);
    }
  }

  async saveNews(saveNewsDTO: []) {
    const fixedDTO = saveNewsDTO['hits'];
    // console.log(fixedDTO);
    await this.newsModel.insertMany(fixedDTO).catch((err) => {
      console.log(err);
    });
  }
  //delete product, but using isActive to false as flag, this will prevent duplicate news after deleted
  async deleteNews(productID: number): Promise<News> {
    return this.newsModel.findOneAndUpdate(
      { objectID: productID },
      { isActive: false },
    );
  }
}
