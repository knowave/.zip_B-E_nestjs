import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_ACCESS_TOKEN_SECRET } from 'src/common/env';
import { User } from 'src/domains/user/entities/user.entity';
import { UserService } from 'src/domains/user/user.service';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    const { id } = payload;
    const user: User = null;

    return user;
  }
}
