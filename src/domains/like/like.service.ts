import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { CommentLikeRequest } from './dto/request/comment-like.req';
import { CommentService } from '../comment/comment.service';

@Injectable()
export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository,
        private readonly commentService: CommentService,
    ) {}

    async commentLike({ commentId }: CommentLikeRequest, userId: string) {
        const commentLike = await this.likeRepository.findOneByUserIdAndCommentId(userId, commentId);
        const comment = await this.commentService.getCommentById(commentId);

        if (commentLike) {
            await this.likeRepository.softDelete(commentLike.id);
            await this.commentService.decrementCommentCount(comment.id);
            return false;
        } else {
            await this.likeRepository.save(
                this.likeRepository.create({
                    user: { id: userId },
                    comment: { id: comment.id },
                }),
            );
            await this.commentService.incrementCommentCount(comment.id);
            return true;
        }
    }
}
