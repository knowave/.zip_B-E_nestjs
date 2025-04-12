import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class GetUserEmailResponse {
    @Expose()
    @ApiProperty()
    email: string;
}
