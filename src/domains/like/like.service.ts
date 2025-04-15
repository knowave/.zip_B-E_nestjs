import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { CommentService } from '../comment/comment.service';
import { ApartmentService } from '../apartment/apartment.service';
import { GetPublicApartmentOrCommentLikeListByUserQuery } from './dto/request/get-apartment-or-comment-like-list-by-user.req';
import { plainToInstance } from 'class-transformer';
import { GetPublicApartmentLikeOrCommentListResponse } from './dto/response/get-apartment-or-comment-like-list-by-user.res';

@Injectable()
export class LikeService {
    constructor(
        private readonly likeRepository: LikeRepository,
        private readonly commentService: CommentService,
        private readonly apartmentService: ApartmentService
    ) {}

    async commentLike(commentId: string, userId: string) {
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
                    comment: { id: comment.id }
                })
            );
            await this.commentService.incrementCommentByLikeCount(comment.id);
            return true;
        }
    }

    async publicApartmentLike(apartmentId: string, userId: string) {
        const apartmentLike = await this.likeRepository.findOneByUserIdAndApartmentId(userId, apartmentId);
        const apartment = await this.apartmentService.getApartmentById(apartmentId);

        if (apartmentLike) {
            await this.likeRepository.softDelete(apartmentLike.id);
            await this.apartmentService.decrementLikeCount(apartment.id);
            return false;
        } else {
            await this.likeRepository.save(
                this.likeRepository.create({
                    user: { id: userId },
                    apartment: { id: apartment.id }
                })
            );
            await this.apartmentService.incrementLikeCount(apartment.id);
            return true;
        }
    }

    async getPublicApartmentOrCommentLikeListByUser(
        { filter, page, take }: GetPublicApartmentOrCommentLikeListByUserQuery,
        userId: string
    ) {
        const skip = (page - 1) * take;
        const [publicApartmentLikeList, totalCount] =
            await this.likeRepository.findManyApartmentOrCommentLikeByUserPagination({
                filter,
                userId,
                skip,
                take
            });

        return plainToInstance(
            GetPublicApartmentLikeOrCommentListResponse,
            <GetPublicApartmentLikeOrCommentListResponse>{
                publicApartmentLikeList,
                currentPage: page,
                totalPage: Math.ceil(totalCount / take),
                totalCount
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true
            }
        );
    }
}
