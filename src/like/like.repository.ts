import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(Like) private readonly repository: Repository<Like>,
  ) {}

  async getLikeByIdAndUserId(likeId: string, userId: string): Promise<Like> {
    return await this.repository
      .createQueryBuilder('like')
      .where('like.likeId = :likeId', { likeId })
      .andWhere('like.user.id = :userId', { userId })
      .getOne();
  }
}
