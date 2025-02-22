import { Body, Controller, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { ApiOperation } from '@nestjs/swagger';
import { CommentLikeRequest } from './dto/request/comment-like.req';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Post('/comment')
    @ApiOperation({ summary: '댓글 좋아요' })
    async commentLike(@Body() body: CommentLikeRequest, @CurrentUser() { id }: CurrentUserType) {
        return await this.likeService.commentLike(body, id);
    }
}
