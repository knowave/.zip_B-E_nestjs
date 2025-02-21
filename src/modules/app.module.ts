import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommentModule } from './comment/comment.module';
import { ListModule } from './list/list.module';
import { LikeModule } from './like/like.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [DatabaseModule, CommentModule, ListModule, LikeModule, S3Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
