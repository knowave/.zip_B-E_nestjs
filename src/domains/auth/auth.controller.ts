import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserBody } from '../user/dto/request/create-user.req';
import { Public } from 'src/common/decorators/public.decorator';
import { SigninBody } from './dto/request/signin.req';
import { SigninResponse } from './dto/response/signin.res';

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
}
