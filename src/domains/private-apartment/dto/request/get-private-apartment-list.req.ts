import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetPrivateApartmentListQuery {
    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ description: '조회할 페이지', example: 1 })
    page: number;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ description: '페이지당 조회할 개수', example: true })
    take: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '검색하고자 하는 아파트 이름' })
    apartmentName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '검색하고자 하는 지역 이름', example: '서울' })
    region

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({ description: '공고 게시일', example: '2025-01-01' })
    startDate: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({ description: '공고 종료일일', example: '2025-01-10' })
    endDate: Date;
}
