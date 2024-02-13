import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { User } from 'src/user/entities/user.entity';
import { Like } from './entities/like';

@Injectable()
export class LikeService {
  constructor(private likeRepository: LikeRepository) {}

  async createLike(likeId: string, user: User) {
    const like = await this.likeRepository.getLikeByIdAndUserId(
      likeId,
      user.userId,
    );

    if (!like) {
      const createLike = new Like({
        user,
      });
    }
  }
}
