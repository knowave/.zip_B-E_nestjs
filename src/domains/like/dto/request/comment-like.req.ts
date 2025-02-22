import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentLikeRequest {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '댓글 아이디' })
    commentId: string;
}
