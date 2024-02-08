import {
  BadRequestException,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_INVALID_TOKEN,
  AUTH_JWT_EXPIRED,
  AUTH_PERMISSION_DENIED,
  USER_NOT_EXIST_REFRESH_TOKEN,
} from '../error-code/auth.error';
import * as CryptoJS from 'crypto-js';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard('jwt-refresh-token') {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    if (authorization === undefined) {
      throw new BadRequestException(USER_NOT_EXIST_REFRESH_TOKEN);
    }

    const refreshToken = authorization.replace('Bearer ', '');
    const refreshTokenValidate = await this.validate(refreshToken);
    request.user = refreshTokenValidate;

    return true;
  }

  async validate(refreshToken: string) {
    try {
      const bytes = CryptoJS.AES.decrypt(refreshToken, process.env.AES_KEY);
      const token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      const tokenVerify = await this.authService.tokenValidate(token);
      const user = await this.userService.getUserById(tokenVerify.id);

      if (user.token === refreshToken) {
        return user;
      } else {
        throw new ForbiddenException(AUTH_PERMISSION_DENIED);
      }
    } catch (err) {
      switch (err.message) {
        case 'invalid token':
          throw new BadRequestException(AUTH_INVALID_TOKEN);
        case 'invalid signature':
          throw new BadRequestException(AUTH_INVALID_TOKEN);
        case 'jwt expired':
          throw new BadRequestException(AUTH_JWT_EXPIRED);

        default:
          throw new InternalServerErrorException(`서버 오류 발생 ${err}`);
      }
    }
  }
}
