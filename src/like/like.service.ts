import { Injectable } from '@nestjs/common';
import { LikeRepository } from './like.repository';
import { User } from 'src/user/entities/user.entity';
import { Like } from './entities/like';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrivateAptRepository } from 'src/private-apt/private-apt.repository';

@Injectable()
export class LikeService {
  constructor(
    private readonly likeRepository: LikeRepository,
    private readonly privateAptRepository: PrivateAptRepository,
  ) {}

  async createLike(createLikeDto: CreateLikeDto) {
    const { likeId, userId, pblancNo, panId } = createLikeDto;

    const like = await this.likeRepository.getLikeByIdAndUserId({
      likeId,
      userId,
      pblancNo,
      panId,
    });

    const privateApt = await this.privateAptRepository.getPrivateAptByPblancNo(
      pblancNo,
    );

    if (!like) {
      if (privateApt) {
        const createLike = new Like();
        privateApt.likes.push(createLike);
      }
    }
  }
}
