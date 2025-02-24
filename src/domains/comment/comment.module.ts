import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './comment.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Comment])],
    providers: [CommentService, CommentRepository],
    controllers: [CommentController],
    exports: [CommentService],
})
export class CommentModule {}
