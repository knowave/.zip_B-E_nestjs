import { Module } from '@nestjs/common';
import { PrivateAptDetailService } from './private-apt-detail.service';
import { PrivateAptDetailController } from './private-apt-detail.controller';

@Module({
  providers: [PrivateAptDetailService],
  controllers: [PrivateAptDetailController]
})
export class PrivateAptDetailModule {}
