import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { CreatePublicApartmentCommentBody } from './dto/request/create-public-apartment-comment.req';
import { CreatePrivateApartmentCommentBody } from './dto/request/create-private-apartment-comment-req';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly service: CommentService) {}

    @Post('/public-apartment')
    @ApiOperation({ summary: '공영 아파트 댓글 작성' })
    async writePublicApartmentComment(
        @Param('publicApartmentId') publicApartmentId: string,
        @Body() body: CreatePublicApartmentCommentBody,
        @CurrentUser() { id: userId }: CurrentUserType,
    ) {
        return await this.service.createPublicApartmentComment({
            body,
            userId,
            publicApartmentId,
        });
    }

    @Post('/private-apartment')
    @ApiOperation({ summary: '민영 아파트 댓글 작성' })
    async writePrivateApartmentComment(
        @Param('privateApartment') privateApartmentId: string,
        @Body() body: CreatePrivateApartmentCommentBody,
        @CurrentUser() { id: userId }: CurrentUserType,
    ) {
        return await this.service.createPrivateApartmentComment({
            body,
            userId,
            privateApartmentId,
        });
    }
}
