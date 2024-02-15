import { Module } from '@nestjs/common';
import { PubNoticeService } from './pub-notice.service';
import { PubNoticeController } from './pub-notice.controller';

@Module({
  providers: [PubNoticeService],
  controllers: [PubNoticeController]
})
export class PubNoticeModule {}
