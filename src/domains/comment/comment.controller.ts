import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { CreatePublicApartmentCommentBody } from './dto/request/create-public-apartment-comment.req';
import { CreatePrivateApartmentCommentBody } from './dto/request/create-private-apartment-comment-req';
import { GetManyApartmentCommentResponse } from './dto/response/get-many-apartment-comment.res';
import { GetManyApartmentCommentQuery } from './dto/request/get-many-apartment-comment.req';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
    constructor(private readonly service: CommentService) {}

    @Post('')
    @ApiOperation({ summary: '공/민영 아파트 댓글 작성' })
    async writePublicApartmentComment(
        @Body() body: CreatePublicApartmentCommentBody,
        @CurrentUser() { id: userId }: CurrentUserType,
        @Param('publicApartmentId') publicApartmentId?: string,
        @Param('privateApartmentId') privateApartmentId?: string,
    ) {
        return await this.service.createApartmentComment({
            body,
            userId,
            publicApartmentId,
            privateApartmentId,
        });
    }

    @Get('')
    @ApiOperation({ summary: '공/민영 아파트 댓글 리스트 조회' })
    @ApiResponse({ type: GetManyApartmentCommentResponse })
    async getApartmentCommentList(@Query() query: GetManyApartmentCommentQuery) {
        return await this.service.getManyApartmentComment(query);
    }
}
