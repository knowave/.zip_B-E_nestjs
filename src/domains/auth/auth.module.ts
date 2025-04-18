import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JWT_ACCESS_TOKEN_EXPIRATION_TIME, JWT_ACCESS_TOKEN_SECRET } from 'src/common/env';
import { JWTStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { NaverStrategy } from './strategies/naver.strategy';
import { KakaoStrategy } from './strategies/kakao.strategy';

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.register({
            secret: JWT_ACCESS_TOKEN_SECRET,
            signOptions: { expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME },
        }),
    ],
    providers: [AuthService, JWTStrategy, LocalStrategy, NaverStrategy, KakaoStrategy],
    controllers: [AuthController],
})
export class AuthModule {}
