import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { GetPublicApartmentOrCommentLikeListByUserQuery } from './dto/request/get-apartment-or-comment-like-list-by-user.req';
import { GetPublicApartmentLikeOrCommentListResponse } from './dto/response/get-apartment-or-comment-like-list-by-user.res';

@ApiTags('like')
@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('/comment/:commentId')
    @ApiOperation({ summary: '댓글 좋아요' })
    @ApiBody({ type: Boolean })
    async commentLike(@Param('commentId') commentId: string, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.commentLike(commentId, id);
    }

    @Post('/apartment/:apartmentId')
    @ApiOperation({ summary: '아파트 좋아요' })
    @ApiBody({ type: Boolean })
    async publicApartmentLike(@Param('apartmentId') apartmentId: string, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.publicApartmentLike(apartmentId, id);
    }

    @Get('/apartment')
    @ApiOperation({ summary: '아파트 및 댓글 좋아요 목록 조회' })
    @ApiResponse({ type: GetPublicApartmentLikeOrCommentListResponse })
    async getPublicApartmentOrCommentLikeListByUser(
        @Query() query: GetPublicApartmentOrCommentLikeListByUserQuery,
        @CurrentUser() { id }: CurrentUserType
    ) {
        return await this.likeService.getPublicApartmentOrCommentLikeListByUser(query, id);
    }
}
