import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommentModule } from './comment/comment.module';
import { LikeModule } from './like/like.module';
import { S3Module } from './s3/s3.module';
import { APP_GUARD } from '@nestjs/core';
import { JWTGuard } from './auth/guards/jwt.guard';
import { UploadModule } from './upload/upload.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [DatabaseModule, AuthModule, UserModule, CommentModule, LikeModule, S3Module, UploadModule],
    controllers: [AppController],
    providers: [AppService, { provide: APP_GUARD, useClass: JWTGuard }],
})
export class AppModule {}
