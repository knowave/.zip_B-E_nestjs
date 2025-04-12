import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { BaseException } from 'src/common/exceptions/error';
import { NOT_FOUND_ERROR } from 'src/common/exceptions/error-code/not-found.error';
import { CreateUserBody } from './dto/request/create-user.req';
import { BAD_REQUEST_ERROR } from 'src/common/exceptions/error-code/bad-request.error';
import * as bcrypt from 'bcrypt';
import { UpdateUserBody } from './dto/request/update-user.req';
import { plainToInstance } from 'class-transformer';
import { User } from './entities/user.entity';
import { ChangePasswordBody } from './dto/request/change-password.req';
import { CreateSocialUserRequest } from './dto/request/create-social-user.req';
import { SocialLoginTypeEnum } from 'src/common/enums/social-login-type.enum';
import { CheckPasswordReqType } from './types/check-password-req.type';
import { UNAUTHORIZED_ERROR } from 'src/common/exceptions/error-code/unauthorized.error';

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

    async createUser({ email, nickname, password, region, imageUrl }: CreateUserBody) {
        let hashedPassword: string;
        const existUser = await this.getUserByEmail(email);

        if (existUser) throw new BaseException(BAD_REQUEST_ERROR.ALREADY_EXIST_USER);

        if (password) {
            hashedPassword = await this.hashedPassword(password);
        }

        const user = this.userRepository.create({
            email,
            nickname,
            password: hashedPassword,
            region,
            imageUrl
        });

        await this.userRepository.save(user);
    }

    async updateTokenById(id: string, token: string) {
        await this.userRepository.update(id, { token });
    }

    async updateUser({ nickname, region, imageUrl }: UpdateUserBody, userId: string) {
        const user = await this.getUserById(userId);

        if (nickname) {
            if (nickname === user.nickname)
                throw new BaseException({
                    ...BAD_REQUEST_ERROR.ALREADY_EXIST_NICKNAME,
                    message: nickname
                });

            user.nickname = nickname;
        }

        if (region) {
            if (region === user.region)
                throw new BaseException({
                    ...BAD_REQUEST_ERROR.ALREADY_EXIST_REGION,
                    message: region
                });

            user.region = region;
        }

        if (imageUrl) user.imageUrl = imageUrl;

        await this.userRepository.save(user);
    }

    async softRemoveUser(userId: string) {
        const user = await this.getUserById(userId);
        user.isDeleted = true;
        await this.userRepository.save(user);
        await this.userRepository.softDelete(userId);
    }

    async getWithdrawUser(userId: string) {
        const user = await this.userRepository.findOneWithdraw30DaysAgoUserById(userId);

        if (!user) throw new BaseException(NOT_FOUND_ERROR.USER);

        return user;
    }

    async deleteUser(userId: string) {
        await this.userRepository.delete(userId);
    }

    async profileUser(userId: string) {
        const user = await this.userRepository.findOneProfileUserById(userId);

        if (!user) throw new BaseException(NOT_FOUND_ERROR.USER);

        return plainToInstance(User, user, {
            excludeExtraneousValues: true,
            enableImplicitConversion: true
        });
    }

    async changePassword({ password }: ChangePasswordBody, userId: string) {
        const user = await this.getUserById(userId);
        const hashedPassword = await this.hashedPassword(password);

        user.password = hashedPassword;
        await this.userRepository.save(user);
    }

    private async hashedPassword(password: string) {
        return await bcrypt.hash(password, this.salt);
    }

    async getSocialUserByIdAndType(socialId: string, socialLoginType: string) {
        const user = await this.userRepository.findOneSocialUserBySocialIdAndType(socialId, socialLoginType);

        if (!user) return null;

        return user;
    }

    async createSocialUser({ email, nickname, socialId, socialLoginType }: CreateSocialUserRequest) {
        if (!Object.values(SocialLoginTypeEnum).includes(socialLoginType as SocialLoginTypeEnum)) {
            throw new BaseException(BAD_REQUEST_ERROR.INVALID_SOCIAL_LOGIN_TYPE);
        }

        const createUser = this.userRepository.create({ email, nickname, socialId, socialLoginType });
        return await this.userRepository.save(createUser);
    }

    async checkEmail(email: string) {
        const user = await this.userRepository.findOneByEmail(email);

        if (user) throw new BaseException(BAD_REQUEST_ERROR.ALREADY_EXIST_EMAIL);

        return true;
    }

    async checkPassword({ userId, body: { password } }: CheckPasswordReqType) {
        const user = await this.getUserById(userId);

        await this.verifyPassword(password, user.password);

        return true;
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        const isPasswordMatch = await bcrypt.compare(plainTextPassword, hashedPassword);

        if (!isPasswordMatch) throw new BaseException(UNAUTHORIZED_ERROR.COMMON);
    }
}
