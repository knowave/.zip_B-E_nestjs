import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApartmentEnum } from '../../enums/apartment.type.enum';

export class GetManyApartmentCommentQuery {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ description: '조회할 페이지', example: 1 })
    page: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ description: '페이지당 조회할 개수', example: 1 })
    take: number;

    @IsEnum({ type: ApartmentEnum })
    @IsNotEmpty()
    @ApiProperty({ enum: ApartmentEnum, description: '댓글 작성하고자 하는 유형' })
    type: ApartmentEnum;

    @IsString()
    @IsOptional()
    @ApiProperty()
    publicApartmentId?: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    privateApartmentId?: string;
}
