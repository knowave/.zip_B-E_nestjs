import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ApartmentLikeParam {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '아파트 아이디' })
    apartmentId: string;
}
