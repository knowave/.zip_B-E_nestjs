import { Controller, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentLikeRequest } from './dto/request/comment-like.req';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { PublicApartmentLikeParam } from './dto/request/public-apartment-like.req';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('/comment')
    @ApiOperation({ summary: '댓글 좋아요' })
    async commentLike(@Param() param: CommentLikeRequest, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.commentLike(param, id);
    }

    @Post('/public-apartment')
    @ApiOperation({ summary: '공영 아파트 좋아요' })
    async publicApartmentLike(@Param() param: PublicApartmentLikeParam, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.publicApartmentLike(param, id);
    }
}
