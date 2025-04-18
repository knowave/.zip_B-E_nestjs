import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class InsertApartmentKeywordBody {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true, description: '검색 키워드' })
    keyword: string;
}
