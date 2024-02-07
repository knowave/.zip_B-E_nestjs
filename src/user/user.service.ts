import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import { USER_NOT_FOUND } from './error-code/user.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async profile(userId: string): Promise<User> {
    const user = await this.userRepository.getUserWithCommentsAndLikes(userId);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }
}
