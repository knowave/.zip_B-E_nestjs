import { Module } from '@nestjs/common';
import { S3Module } from '../s3/s3.module';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';

@Module({
    imports: [S3Module],
    providers: [UploadService],
    controllers: [UploadController],
})
export class UploadModule {}
