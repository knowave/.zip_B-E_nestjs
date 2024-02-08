import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import {
  EXIST_EMAIL_BAD_REQUEST,
  USER_NOT_FOUND,
} from './error-code/user.error';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async profile(userId: string): Promise<User> {
    const user = await this.userRepository.getUserWithCommentsAndLikes(userId);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async getUserById(userId: string): Promise<User> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    return user;
  }

  async updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const { userId, nickname, email, preferredRegion } = updateUserDto;

    const user = await this.userRepository.getUserById(userId);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    if (email) {
      const existEmail = await this.userRepository.getUserByEmail(email);
      if (existEmail) throw new BadRequestException(EXIST_EMAIL_BAD_REQUEST);

      user.email = email;
    }

    if (nickname) {
      user.nickname = nickname;
    }

    if (preferredRegion) {
      user.preferredRegion = preferredRegion;
    }

    return await this.userRepository.save(user);
  }
}
