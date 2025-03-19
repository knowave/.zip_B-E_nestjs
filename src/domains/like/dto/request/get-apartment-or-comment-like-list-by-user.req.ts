import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { LikeFilterEnum } from '../../enums/like-filter.enum';

export class GetPublicApartmentOrCommentLikeListByUserQuery {
    @IsEnum(LikeFilterEnum)
    @IsNotEmpty()
    @ApiProperty({ enum: LikeFilterEnum })
    filter: LikeFilterEnum;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ description: '조회할 페이지', example: 1 })
    page: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ description: '페이지당 조회할 개수', example: 10 })
    take: number;
}
