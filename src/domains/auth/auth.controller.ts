import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreateUserBody } from '../user/dto/request/create-user.req';
import { Public } from 'src/common/decorators/public.decorator';

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
}
