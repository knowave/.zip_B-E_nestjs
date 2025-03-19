import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GetApartmentListQuery {
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

    @IsString()
    @IsOptional()
    @ApiProperty({ description: '공고 지역명', example: '서울' })
    supplyAreaName: string;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({ description: '공고 게시일', example: '2025-01-01' })
    startDate: Date;

    @IsDate()
    @IsOptional()
    @Type(() => Date)
    @ApiProperty({ description: '공고 게시일', example: '2025-01-01' })
    endDate: Date;
}
