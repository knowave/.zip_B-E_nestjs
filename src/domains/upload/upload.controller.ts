import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UploadFileResponse } from './dto/response/upload-file.res';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    })
    @ApiOperation({ summary: '파일 업로드' })
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ type: UploadFileResponse })
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        return this.uploadService.uploadFile(file);
    }
}
