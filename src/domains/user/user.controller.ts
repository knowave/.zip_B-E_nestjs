import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserBody } from './dto/request/update-user.req';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { ChangePasswordBody } from './dto/request/change-password.req';
import { CheckEmailRequest } from './dto/request/check-email.req';
import { Public } from 'src/common/decorators/public.decorator';
import { CheckPasswordBody } from './dto/request/check-password.req';
import { GetUserEmailResponse } from './dto/response/get-user-email.res';

@ApiTags('user')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Patch()
    @ApiOperation({ summary: '사용자 정보 수정' })
    async updateUser(@Body() updateUserBody: UpdateUserBody, @CurrentUser() { id }: CurrentUserType) {
        await this.userService.updateUser(updateUserBody, id);
    }

    @Get('/profile')
    @ApiOperation({ summary: '사용자 프로필 조회' })
    async profileUser(@CurrentUser() { id }: CurrentUserType) {
        return this.userService.profileUser(id);
    }

    @Patch('/change-password')
    @ApiOperation({ summary: '사용자 비밀번호 수정' })
    async changePassword(@Body() body: ChangePasswordBody, @CurrentUser() { id }: CurrentUserType) {
        return this.userService.changePassword(body, id);
    }

    @Post('/check-email')
    @Public()
    @ApiOperation({ summary: '이메일 중복확인' })
    @ApiResponse({ type: Boolean })
    async checkEmail(@Body() body: CheckEmailRequest) {
        return this.userService.checkEmail(body.email);
    }

    @Post('/check-password')
    @ApiBody({ type: CheckPasswordBody })
    @ApiResponse({ type: Boolean })
    @ApiOperation({ summary: '비밀번호 확인' })
    async checkPassword(@Body() body: CheckPasswordBody, @CurrentUser() { id }: CurrentUserType) {
        return this.userService.checkPassword({ userId: id, body });
    }

    @Get('/email')
    @ApiResponse({ type: GetUserEmailResponse })
    @ApiOperation({ summary: '사용자 이메일 조회' })
    async getUserEmail(@CurrentUser() { id }: CurrentUserType) {
        return this.userService.getUserEmail(id);
    }
}
