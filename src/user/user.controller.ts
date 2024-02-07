import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':userId')
  async profile(@Param() userId: string): Promise<User> {
    return this.userService.profile(userId);
  }
}
