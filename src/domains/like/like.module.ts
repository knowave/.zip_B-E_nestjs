import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { CommentModule } from '../comment/comment.module';
import { ApartmentModule } from '../apartment/apartment.module';

@Module({
    imports: [TypeOrmModule.forFeature([Like]), CommentModule, ApartmentModule],
    providers: [LikeService, LikeRepository],
    controllers: [LikeController],
})
export class LikeModule {}
