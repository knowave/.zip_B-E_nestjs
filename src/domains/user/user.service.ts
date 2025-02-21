import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import { CreateUserBody } from './dto/request/create-user.req';
import { BAD_REQUEST_ERROR } from 'src/common/exceptions/error-code/bad-request.error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private readonly salt: number;
  constructor(private readonly userRepository: UserRepository) {
    this.salt = 10;
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOneById(id);

    if (!user) throw new BaseException(NOT_FOUND_ERROR.USER);

    return user;
  }

  getUserByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }

  async createUser({
    email,
    nickname,
    password,
    region,
    imageUrl,
  }: CreateUserBody) {
    let hashedPassword: string;
    const existUser = await this.getUserByEmail(email);

    if (existUser)
      throw new BaseException(BAD_REQUEST_ERROR.ALREADY_EXIST_USER);

    if (password) {
      hashedPassword = await bcrypt.hash(password, this.salt);
    }

    const user = this.userRepository.create({
      email,
      nickname,
      password: hashedPassword,
      region,
      imageUrl,
    });

    await this.userRepository.save(user);
  }

  async updateTokenById(id: string, token: string) {
    await this.userRepository.update(id, { token });
  }
}
