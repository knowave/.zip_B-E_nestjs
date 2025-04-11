import { ApiProperty, PickType } from '@nestjs/swagger';
import { Comment } from '../../entities/comment.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { CreateCommentTypeEnum } from '../../enums/create-comment-type.enum';

export class CreateCommentBody extends PickType(Comment, ['content', 'isPrivate']) {
    @IsEnum(CreateCommentTypeEnum)
    @IsNotEmpty()
    @ApiProperty({ enum: CreateCommentTypeEnum, description: '댓글 작성하고자 하는 유형' })
    type: CreateCommentTypeEnum;
}

// export class CreateCommentBody extends PickType(Comment, ['content', 'isPrivate']) {
//     @IsEnum(CreateCommentTypeEnum)
//     @IsNotEmpty()
//     @ApiProperty({ enum: CreateCommentTypeEnum, description: '댓글 작성하고자 하는 유형' })
//     type: CreateCommentTypeEnum;
// }
