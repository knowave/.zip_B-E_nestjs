import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import * as bcrypt from 'bcrypt';
import { UNAUTHORIZED_ERROR } from 'src/common/exceptions/error-code/unauthorized.error';
import { SigninBody } from './dto/request/signin.req';
import { User } from '../user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import {
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_SECRET,
} from 'src/common/env';
import { plainToInstance } from 'class-transformer';
import { SigninResponse } from './dto/response/signin.res';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

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

  async signin({ email, password }: SigninBody) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) throw new BaseException(NOT_FOUND_ERROR.USER);

    await this.verifyPassword(password, user.password);

    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);

    await this.userService.updateTokenById(user.id, refreshToken);
    return plainToInstance(
      SigninResponse,
      <SigninResponse>{
        accessToken,
        refreshToken,
      },
      {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      },
    );
  }

  generateAccessToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return this.jwtService.sign(payload, {
      secret: JWT_ACCESS_TOKEN_SECRET,
      expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    });
  }

  generateRefreshToken(user: User) {
    const payload = { id: user.id, email: user.email };

    return this.jwtService.sign(payload, {
      secret: JWT_REFRESH_TOKEN_SECRET,
      expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    });
  }

  async signout(userId: string) {
    await this.userService.updateTokenById(userId, null);
  }
}
