import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CommentLikeRequest } from './dto/request/comment-like.req';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { ApartmentLikeParam } from './dto/request/apartment-like.req';
import { GetPublicApartmentOrCommentLikeListByUserQuery } from './dto/request/get-apartment-or-comment-like-list-by-user.req';
import { GetPublicApartmentLikeOrCommentListResponse } from './dto/response/get-apartment-or-comment-like-list-by-user.res';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('/comment')
    @ApiOperation({ summary: '댓글 좋아요' })
    async commentLike(@Param() param: CommentLikeRequest, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.commentLike(param, id);
    }

    @Post('/public-apartment')
    @ApiOperation({ summary: '아파트 좋아요' })
    async publicApartmentLike(@Param() param: ApartmentLikeParam, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.publicApartmentLike(param, id);
    }

    @Get('/public-apartment')
    @ApiOperation({ summary: '아파트 및 댓글 좋아요 목록 조회' })
    @ApiResponse({ type: GetPublicApartmentLikeOrCommentListResponse })
    async getPublicApartmentOrCommentLikeListByUser(
        @Query() query: GetPublicApartmentOrCommentLikeListByUserQuery,
        @CurrentUser() { id }: CurrentUserType,
    ) {
        return await this.likeService.getPublicApartmentOrCommentLikeListByUser(query, id);
    }
}
