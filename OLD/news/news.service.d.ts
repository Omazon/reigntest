import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Model } from 'mongoose';
import { News } from './interfaces/news.interface';
export declare class NewsService {
    private httpService;
    private newsModel;
    private readonly logger;
    constructor(httpService: HttpService, newsModel: Model<News>);
    getNewsFromAPI(): Observable<AxiosResponse<any>>;
    getNews(page?: number, limit?: number, story_title?: any, author?: any, tags?: any): Promise<News[]>;
    saveNews(saveNewsDTO: []): Promise<void>;
    deleteNews(productID: number): Promise<News>;
}
