import { Body, Controller, Delete, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserBody } from '../user/dto/request/create-user.req';
import { Public } from 'src/common/decorators/public.decorator';
import { SigninBody } from './dto/request/signin.req';
import { SigninResponse } from './dto/response/signin.res';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Public()
    @Post('/signup')
    @ApiOperation({ summary: '회원가입' })
    async signup(@Body() createUserBody: CreateUserBody) {
        await this.userService.createUser(createUserBody);
    }

    @Public()
    @Post('/signin')
    @ApiOperation({ summary: '로그인' })
    @ApiResponse({ type: SigninResponse })
    async signin(@Body() signInBody: SigninBody) {
        return this.authService.signin(signInBody);
    }

    @Post('/signout')
    @ApiOperation({ summary: '로그아웃' })
    async signout(@CurrentUser() { id }: CurrentUserType) {
        await this.authService.signout(id);
    }

    @Delete()
    @ApiOperation({ summary: '회원 탈퇴' })
    async withdrawUser(@CurrentUser() { id }: CurrentUserType) {
        return await this.authService.withdrawUser(id);
    }

    @Delete('/complete-withdraw')
    @ApiOperation({ summary: '회원 탈퇴 완료' })
    async completeWithdrawUser(@CurrentUser() { id }: CurrentUserType) {
        return await this.authService.completeWithdrawUser(id);
    }
}
