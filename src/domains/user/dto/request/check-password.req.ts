import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPasswordBody {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ required: true })
    password: string;
}
