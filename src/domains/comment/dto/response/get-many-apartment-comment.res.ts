import { Expose, Type } from 'class-transformer';
import { Comment } from '../../entities/comment.entity';
import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { User } from 'src/domains/user/entities/user.entity';

class GetUserDto extends PickType(User, ['id', 'email', 'nickname', 'imageUrl', 'region']) {}

class GetCommentDto extends OmitType(Comment, ['user']) {
    @Expose()
    @Type(() => GetUserDto)
    @ApiProperty({ type: GetUserDto })
    user: GetUserDto;
}

export class GetManyApartmentCommentResponse {
    @Expose()
    @Type(() => GetCommentDto)
    @ApiProperty({ type: [GetCommentDto] })
    commentList: GetCommentDto[];

    @Expose()
    @ApiProperty()
    currentPage: number;

    @Expose()
    @ApiProperty()
    totalPage: number;

    @Expose()
    @ApiProperty()
    totalCount: number;
}
