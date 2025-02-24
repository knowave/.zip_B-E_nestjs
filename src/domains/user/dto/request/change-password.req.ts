import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordBody {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;
}
