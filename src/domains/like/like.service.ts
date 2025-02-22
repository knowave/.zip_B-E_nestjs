import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { CommentLikeRequest } from './dto/request/comment-like.req';

@Injectable()
export class LikeService {
    constructor(private readonly likeRepository: LikeRepository) {}

    async commentLike({ commentId }: CommentLikeRequest, userId: string) {
        const commentLike = await this.likeRepository.findOneByUserIdAndCommentId(userId, commentId);

        if (commentLike) {
            await this.likeRepository.softDelete(commentLike.id);
            return false;
        } else {
            await this.likeRepository.save(
                this.likeRepository.create({
                    user: { id: userId },
                    comment: { id: commentId },
                }),
            );
            return true;
        }
    }
}
