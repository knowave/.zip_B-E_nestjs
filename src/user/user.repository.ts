import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { Apartment } from 'src/apartment/entities/apartment.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly repository: Repository<User>) {}

  async getUserById(userId: string): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getOne();
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();
  }

  async getUserWithCommentsAndLikes(userId: string): Promise<User> {
    return await this.repository
      .createQueryBuilder('user')
      .innerJoinAndSelect('user.likes', 'likes')
      .leftJoinAndSelect('likes.privateApt', 'likePrivateApt')
      .leftJoinAndSelect('likes.publicApt', 'likePublicApt')
      .leftJoinAndSelect('user.likes', 'likes')
      .innerJoinAndSelect(
        Apartment,
        'apartment',
        'publicApt.region = user.preferredRegion',
      )
      .addSelect('COUNT(likes.id)', 'likeCount')
      .where('user.userId = :userId', { userId })
      .getOne();
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }

  async bulkSave(users: User[]): Promise<User[]> {
    return await this.repository.save(users);
  }
}
