import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PublicApartmentLikeParam {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: '공영 아파트 아이디' })
    publicApartmentId: string;
}
