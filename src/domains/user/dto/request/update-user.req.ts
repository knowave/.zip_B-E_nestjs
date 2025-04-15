import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserBody {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    nickname?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    region?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    imageUrl?: string;
}
