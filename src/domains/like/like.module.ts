import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { LikeRepository } from './like.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { CommentModule } from '../comment/comment.module';
import { PublicApartmentModule } from '../public-apartment/public-apartment.module';
import { PrivateApartmentModule } from '../private-apartment/private-apartment.module';

@Module({
    imports: [TypeOrmModule.forFeature([Like]), CommentModule, PublicApartmentModule, PrivateApartmentModule],
    providers: [LikeService, LikeRepository],
    controllers: [LikeController],
})
export class LikeModule {}
