import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetApartmentPopularSearchKeywordResponse {
    @Expose()
    @ApiProperty({ readOnly: true, description: '검색 키워드' })
    keyword: string;

    @Expose()
    @ApiProperty({ readOnly: true, description: '검색 횟수' })
    score: number;
}
