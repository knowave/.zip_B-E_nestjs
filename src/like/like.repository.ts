import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Like } from './entities/like';
import { GetLikeByIdAndUserIdDto } from './dto/get-like-by-id-and-user-id.dto';

@Injectable()
export class LikeRepository {
  constructor(
    @InjectRepository(Like) private readonly repository: Repository<Like>,
  ) {}

  async getLikeByIdAndUserId(
    getLikeByIdAndUserIdDto: GetLikeByIdAndUserIdDto,
  ): Promise<Like> {
    const { likeId, userId, pblancNo, panId } = getLikeByIdAndUserIdDto;
    const qb = this.repository
      .createQueryBuilder('like')
      .where('like.likeId = :likeId', { likeId })
      .andWhere('like.user.id = :userId', { userId });

    if (pblancNo) {
      qb.leftJoinAndSelect('like.privateApt', 'privateApt').andWhere(
        'privateApt.id = :pblancNo',
        { pblancNo },
      );
    }

    if (panId) {
      qb.leftJoinAndSelect('like.pubNotice', 'pubNotice').andWhere(
        'pubNotice.id = :panId',
        { panId },
      );
    }

    return qb.getOne();
  }
}
