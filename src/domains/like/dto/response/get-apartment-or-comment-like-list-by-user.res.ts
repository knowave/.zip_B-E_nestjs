import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Apartment } from 'src/domains/apartment/entities/apartment.entity';
import { Comment } from 'src/domains/comment/entities/comment.entity';
import { Like } from '../../entities/like.entity';

export class GetApartmentResponse extends Apartment {}

export class GetCommentResponse extends Comment {}

export class GetPublicApartmentOrCommentLikeResponse extends Like {
    @Expose()
    @Type(() => GetApartmentResponse)
    apartment: GetApartmentResponse;

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
