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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsController = void 0;
const common_1 = require("@nestjs/common");
const news_service_1 = require("./news.service");
let NewsController = class NewsController {
    constructor(newsServices) {
        this.newsServices = newsServices;
    }
    getNewsFromApi(res) {
        this.newsServices.getNewsFromAPI().subscribe((value) => {
            this.createNews(value);
            return res.status(common_1.HttpStatus.OK).json({
                message: 'save to DB',
            });
        });
    }
    async createNews(NewsDTO) {
        await this.newsServices.saveNews(NewsDTO);
    }
    async getNews(res, page, limit, author, story_title, tags) {
        const news = await this.newsServices.getNews(page, limit, story_title, author, tags);
        return res.status(common_1.HttpStatus.OK).json({
            news,
        });
    }
    async deleteNews(res, productID) {
        const news = await this.newsServices.deleteNews(productID);
        if (!news)
            throw new common_1.NotFoundException('News does not exist');
        return res.status(common_1.HttpStatus.OK).json({
            message: 'news deleted',
        });
    }
};
__decorate([
    (0, common_1.Get)('/get-product-from-api'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NewsController.prototype, "getNewsFromApi", null);
__decorate([
    (0, common_1.Get)('/'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __param(3, (0, common_1.Query)('author')),
    __param(4, (0, common_1.Query)('title')),
    __param(5, (0, common_1.Query)('tags')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "getNews", null);
__decorate([
    (0, common_1.Delete)('/delete'),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('productID')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], NewsController.prototype, "deleteNews", null);
NewsController = __decorate([
    (0, common_1.Controller)('news'),
    __metadata("design:paramtypes", [news_service_1.NewsService])
], NewsController);
exports.NewsController = NewsController;
//# sourceMappingURL=news.controller.js.map