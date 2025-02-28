import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';
import { PublicApartmentModule } from '../public-apartment/public-apartment.module';
import { UserModule } from '../user/user.module';

@Module({
    imports: [TypeOrmModule.forFeature([Comment]), PublicApartmentModule, UserModule],
    providers: [CommentService, CommentRepository],
    controllers: [CommentController],
    exports: [CommentService],
})
export class CommentModule {}
