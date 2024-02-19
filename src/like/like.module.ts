import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like';
import { PrivateAptModule } from 'src/private-apt/private-apt.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), PrivateAptModule],
  providers: [LikeService],
  controllers: [LikeController],
})
export class LikeModule {}
