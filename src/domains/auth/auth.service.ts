import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import * as bcrypt from 'bcrypt';
import { UNAUTHORIZED_ERROR } from 'src/common/exceptions/error-code/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user) throw new BaseException(NOT_FOUND_ERROR.USER);

    await this.verifyPassword(password, user.password);
  }

  async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatch = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatch) throw new BaseException(UNAUTHORIZED_ERROR.COMMON);
  }
}
