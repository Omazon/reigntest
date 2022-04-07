import { NewsService } from './news.service';
export declare class NewsController {
    private newsServices;
    constructor(newsServices: NewsService);
    getNewsFromApi(res: any): void;
    createNews(NewsDTO: any): Promise<void>;
    getNews(res: any, page?: number, limit?: number, author?: string, story_title?: string, tags?: string): Promise<any>;
    deleteNews(res: any, productID: number): Promise<any>;
}
