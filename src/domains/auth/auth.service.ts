import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import * as bcrypt from 'bcryptjs';
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
import { SocialLoginTypeEnum } from 'src/common/enums/social-login-type.enum';
import { SocialSigninRequest } from './dto/request/social-signin.req';
import { v4 as uuid } from 'uuid';
import { SocialSigninResponse } from './dto/response/social-signin.res';

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
        const isPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

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

    async signout(userId: string) {
        await this.userService.updateTokenById(userId, null);
    }

    private generateAccessToken(user: User) {
        const payload = { id: user.id, email: user.email };

        return this.jwtService.sign(payload, {
            secret: JWT_ACCESS_TOKEN_SECRET,
            expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
        });
    }

    private generateRefreshToken(user: User) {
        const payload = { id: user.id, email: user.email };

        return this.jwtService.sign(payload, {
            secret: JWT_REFRESH_TOKEN_SECRET,
            expiresIn: JWT_REFRESH_TOKEN_EXPIRATION_TIME,
        });
    }

    async withdrawUser(userId: string) {
        return await this.userService.softRemoveUser(userId);
    }

    async completeWithdrawUser(userId: string) {
        const user = await this.userService.getWithdrawUser(userId);

        await this.userService.deleteUser(user.id);
    }

    async validateKakao(kakaoId: string) {
        return await this.userService.getSocialUserByIdAndType(kakaoId, SocialLoginTypeEnum.KAKAO);
    }

    async validateNaver(naverId: string) {
        return await this.userService.getSocialUserByIdAndType(naverId, SocialLoginTypeEnum.NAVER);
    }

    async socialSignin({ socialId, email, type }: SocialSigninRequest, userId?: string) {
        let user: User;

        if (socialId && email && type && !userId) {
            const tempSocialUsername = `${type}-${uuid()}`;

            user = await this.userService.createSocialUser({
                email,
                nickname: tempSocialUsername,
                socialId,
                socialLoginType: type,
            });

            userId = user.id;
        }

        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);
        await this.userService.updateTokenById(userId, refreshToken);

        return plainToInstance(
            SocialSigninResponse,
            <SocialSigninResponse>{
                accessToken,
                refreshToken,
                user,
            },
            {
                excludeExtraneousValues: true,
                enableImplicitConversion: true,
            },
        );
    }
}
