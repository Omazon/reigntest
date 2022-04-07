"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var NewsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schedule_1 = require("@nestjs/schedule");
let NewsService = NewsService_1 = class NewsService {
    constructor(httpService, newsModel) {
        this.httpService = httpService;
        this.newsModel = newsModel;
        this.logger = new common_1.Logger(NewsService_1.name);
    }
    getNewsFromAPI() {
        console.log('get cada 5');
        return this.httpService
            .get('https://hn.algolia.com/api/v1/search_by_date?query=nodejs')
            .pipe((0, rxjs_1.map)((response) => response.data));
    }
    async getNews(page = 1, limit = 5, story_title = null, author = null, tags = null) {
        const filters = {
            author: { $regex: author },
            story_title: { $regex: story_title },
            _tags: { $regex: tags },
            isActive: true,
        };
        Object.keys(filters).forEach((key) => {
            if (filters[key].$regex === null) {
                delete filters[key];
            }
        });
        if (author || story_title || tags) {
            return this.newsModel
                .find(filters)
                .skip((page - 1) * limit)
                .limit(limit);
        }
        else {
            return this.newsModel
                .find({ isActive: true })
                .skip((page - 1) * limit)
                .limit(limit);
        }
    }
    async saveNews(saveNewsDTO) {
        const fixedDTO = saveNewsDTO['hits'];
        await this.newsModel.insertMany(fixedDTO).catch((err) => {
            console.log(err);
        });
    }
    async deleteNews(productID) {
        return this.newsModel.findOneAndUpdate({ objectID: productID }, { isActive: false });
    }
};
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_HOUR),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], NewsService.prototype, "getNewsFromAPI", null);
NewsService = NewsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)('News')),
    __metadata("design:paramtypes", [axios_1.HttpService,
        mongoose_2.Model])
], NewsService);
exports.NewsService = NewsService;
//# sourceMappingURL=news.service.js.map