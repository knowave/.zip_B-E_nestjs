import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UploadFileResponse {
    @Expose()
    @ApiProperty({ readOnly: true, description: '업로드된 파일의 URL' })
    url: string;
}
