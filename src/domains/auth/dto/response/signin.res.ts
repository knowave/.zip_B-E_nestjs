import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SigninResponse {
    @Expose()
    @ApiProperty({
        example: 'accessToken',
        description: '액세스 토큰',
    })
    accessToken: string;

    @Expose()
    @ApiProperty({
        example: 'refreshToken',
        description: '리프레시 토큰',
    })
    refreshToken: string;
}
