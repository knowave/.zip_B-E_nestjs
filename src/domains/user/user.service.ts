import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) throw new BaseException(NOT_FOUND_ERROR.USER);

    return user;
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }
}
