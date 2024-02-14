import { Module } from '@nestjs/common';
import { PrivateAptService } from './private-apt.service';
import { PrivateAptController } from './private-apt.controller';

@Module({
  providers: [PrivateAptService],
  controllers: [PrivateAptController],
})
export class PrivateAptModule {}
