import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { CommentLikeRequest } from './dto/request/comment-like.req';
import { CommentService } from '../comment/comment.service';
import { PublicApartmentLikeParam } from './dto/request/public-apartment-like.req';
import { PublicApartmentService } from '../public-apartment/public-apartment.service';
import { GetPublicApartmentOrCommentLikeListByUserQuery } from './dto/request/get-public-apartment-or-comment-like-list-by-user.req';
import { plainToInstance } from 'class-transformer';
import { GetPublicApartmentLikeOrCommentListResponse } from './dto/response/get-public-apartment-or-comment-like-list-by-user.res';

@Injectable()
export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository,
        private readonly commentService: CommentService,
        private readonly publicApartmentService: PublicApartmentService,
    ) {}

    async commentLike({ commentId }: CommentLikeRequest, userId: string) {
        const commentLike = await this.likeRepository.findOneByUserIdAndCommentId(userId, commentId);
        const comment = await this.commentService.getCommentById(commentId);

        if (commentLike) {
            await this.likeRepository.softDelete(commentLike.id);
            await this.commentService.decrementCommentByLikeCount(comment.id);
            return false;
        } else {
            await this.likeRepository.save(
                this.likeRepository.create({
                    user: { id: userId },
                    comment: { id: comment.id },
                }),
            );
            await this.commentService.incrementCommentByLikeCount(comment.id);
            return true;
        }
    }

    async publicApartmentLike({ publicApartmentId }: PublicApartmentLikeParam, userId: string) {
        const publicApartmentLike = await this.likeRepository.findOneByUserIdAndPublicApartmentId(
            userId,
            publicApartmentId,
        );
        const publicApartment = await this.publicApartmentService.getPublicApartmentById(publicApartmentId);

        if (publicApartment) {
            await this.likeRepository.softDelete(publicApartmentLike.id);
            await this.publicApartmentService.decrementLikeCount(publicApartment.id);
            return false;
        } else {
            await this.likeRepository.save(
                this.likeRepository.create({
                    user: { id: userId },
                    publicApartment: { id: publicApartment.id },
                }),
            );
            await this.publicApartmentService.incrementLikeCount(publicApartment.id);
            return true;
        }
    }

    async getPublicApartmentOrCommentLikeListByUser(
        { filter, page, take }: GetPublicApartmentOrCommentLikeListByUserQuery,
        userId: string,
    ) {
        const skip = (page - 1) * take;
        const [publicApartmentLikeList, totalCount] =
            await this.likeRepository.findManyPublicApartmentOrCommentLikeByUserPagination({
                filter,
                userId,
                skip,
                take,
            });

        return plainToInstance(
            GetPublicApartmentLikeOrCommentListResponse,
            <GetPublicApartmentLikeOrCommentListResponse>{
                publicApartmentLikeList,
                currentPage: page,
                totalPage: Math.ceil(totalCount / take),
                totalCount,
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            },
        );
    }
}
