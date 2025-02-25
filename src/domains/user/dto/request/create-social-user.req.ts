import { PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { User } from '../../entities/user.entity';

export class CreateSocialUserRequest extends PickType(User, ['email', 'nickname', 'socialId', 'socialLoginType']) {}
