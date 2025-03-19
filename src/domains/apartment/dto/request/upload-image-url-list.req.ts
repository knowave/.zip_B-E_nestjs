import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UploadImageUrlListParam {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    publicApartmentId: string;
}

export class UploadImageUrlListBody {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty()
    imageUrlList: string[];
}
