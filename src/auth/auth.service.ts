import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { USER_NOT_FOUND } from 'src/user/error-code/user.error';
import { UserRepository } from 'src/user/user.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { JWT_NOT_REISSUED } from './error-code/auth.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async validateUser(email: string, hashedPassword: string) {
    const user = await this.userRepository.getUserByEmail(email);

    if (!user) throw new NotFoundException(USER_NOT_FOUND);

    const password = await bcrypt.compare(hashedPassword, user.password);

    if (password) {
      const { password, ...result } = user;
      return result;
    }
  }

  async createOnceToken(socialType: string, socialId: string) {
    const payload = {
      type: socialType,
      id: socialId,
    };

    return await this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });
  }

  async createAccessToken(user: User): Promise<string> {
    const payload = {
      type: 'accessToken',
      id: user.userId,
      nickname: user.nickname,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '15m',
    });

    return accessToken;
  }

  async createRefreshToken(user: User) {
    const payload = {
      type: 'refreshToken',
      id: user.userId,
      nickname: user.nickname,
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.AES_KEY,
      expiresIn: '15m',
    });

    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);

    const refreshToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    const existUser = await this.userRepository.getUserById(user.userId);

    user.token = refreshToken;
    await this.userRepository.save(existUser);
    return { refreshToken, tokenExp };
  }

  async reissueRefreshToken(user: User) {
    const existUser = await this.userRepository.getUserById(user.userId);

    if (!existUser) throw new NotFoundException(USER_NOT_FOUND);

    const payload = {
      id: user.userId,
      nickname: user.nickname,
      type: 'refreshToken',
    };

    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '20700m',
    });

    const tokenVerify = await this.tokenValidate(token);
    const tokenExp = new Date(tokenVerify['exp'] * 1000);
    const current = new Date();
    const timeRemaining = Math.floor(
      (tokenExp.getTime() - current.getTime()) / 1000 / 60 / 60,
    );

    if (timeRemaining > 10) throw new BadRequestException(JWT_NOT_REISSUED);

    const accessToken = await this.createAccessToken(user);
    const refreshToken = CryptoJS.AES.encrypt(
      JSON.stringify(token),
      process.env.AES_KEY,
    ).toString();

    existUser.token = refreshToken;
    await this.userRepository.save(existUser);
    return { accessToken, refreshToken: { refreshToken, tokenExp } };
  }

  async tokenValidate(token: string) {
    return await this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
