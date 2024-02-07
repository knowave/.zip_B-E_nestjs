import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CurrentUser } from 'src/auth/decorator/current-user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async profile(@Param() userId: string): Promise<User> {
    return this.userService.profile(userId);
  }

  @Patch()
  async updateUser(@CurrentUser() user: User): Promise<User> {
    return this.userService.updateUser({
      userId: user.userId,
      nickname: user.nickname,
      email: user.email,
    });
  }
}
