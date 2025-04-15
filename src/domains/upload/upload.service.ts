import { Injectable } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { S3_BUCKET_NAME } from 'src/common/env';
import { plainToInstance } from 'class-transformer';
import { UploadFileResponse } from './dto/response/upload-file.res';

@Injectable()
export class UploadService {
    constructor(private readonly s3Service: S3Service) {}

    async uploadFile(file: Express.Multer.File) {
        const filename = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const key = `dotzip-${Date.now()}-${filename}`;

        try {
            await this.s3Service.uploadObject(key, file.buffer, file.mimetype);
            const url = `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${key}`;

            return plainToInstance(UploadFileResponse, <UploadFileResponse>{
                url
            });
        } catch (err) {
            throw new Error(`Failed to upload file: ${err}`);
        }
    }
}
