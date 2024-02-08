import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AUTH_INVALID_TOKEN,
  AUTH_JWT_EXPIRED,
  USER_NOT_EXIST_TOKEN,
} from '../error-code/auth.error';
import { UserService } from 'src/user/user.service';
import { AuthService } from '../auth.service';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { authorization } = req.headers;

    if (authorization === undefined) {
      throw new BadRequestException(USER_NOT_EXIST_TOKEN);
    }

    const token = authorization.replace('Bearer ', '');
    const tokenValidate = await this.validate(token);
    req.user = tokenValidate.user ? tokenValidate.user : tokenValidate;

    return true;
  }

  async validate(token: string) {
    try {
      // 토큰 검증
      const tokenVerify = await this.authService.tokenValidate(token);
      if (tokenVerify.type === 'accessToken') {
        return await this.userService.getUserById(tokenVerify.id);
      } else {
        return tokenVerify;
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
