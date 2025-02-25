import { Expose } from 'class-transformer';
import { SigninResponse } from './signin.res';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/domains/user/entities/user.entity';

export class SocialSigninResponse extends SigninResponse {
    @Expose()
    @ApiProperty()
    user: User;
}
