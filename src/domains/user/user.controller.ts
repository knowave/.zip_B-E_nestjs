import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserBody } from './dto/request/update-user.req';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from 'src/common/types/current-user.type';
import { ChangePasswordBody } from './dto/request/change-password.req';

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
        return await this.userService.profileUser(id);
    }

    @Patch('/change-password')
    @ApiOperation({ summary: '사용자 비밀번호 수정' })
    async changePassword(@Body() body: ChangePasswordBody, @CurrentUser() { id }: CurrentUserType) {
        return await this.userService.changePassword(body, id);
    }
}
