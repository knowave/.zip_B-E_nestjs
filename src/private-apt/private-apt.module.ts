import { Module } from '@nestjs/common';
import { PrivateAptService } from './private-apt.service';
import { PrivateAptController } from './private-apt.controller';
import { PrivateAptRepository } from './private-apt.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateApt } from './entities/private-apt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateApt])],
  providers: [PrivateAptService, PrivateAptRepository],
  controllers: [PrivateAptController],
  exports: [PrivateAptRepository],
})
export class PrivateAptModule {}
