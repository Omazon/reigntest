import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    NewsModule,
    MongooseModule.forRoot(
      'mongodb+srv://yxUOh5qJ838rJOAz:yxUOh5qJ838rJOAz@cluster0.bdnfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
      },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
