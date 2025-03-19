import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PublicApartment } from 'src/domains/apartment/entities/apartment.entity';
import { Comment } from 'src/domains/comment/entities/comment.entity';
import { Like } from '../../entities/like.entity';

export class GetPublicApartmentResponse extends PublicApartment {}

export class GetCommentResponse extends Comment {}

export class GetPublicApartmentOrCommentLikeResponse extends Like {
    @Expose()
    @Type(() => GetPublicApartmentResponse)
    publicApartment: GetPublicApartmentResponse;

    @Expose()
    @Type(() => GetCommentResponse)
    comment: GetCommentResponse;
}

export class GetPublicApartmentLikeOrCommentListResponse {
    @Expose()
    @Type(() => GetPublicApartmentOrCommentLikeResponse)
    @ApiProperty({ type: [GetPublicApartmentOrCommentLikeResponse] })
    publicApartmentLikeList: GetPublicApartmentOrCommentLikeResponse[];

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
