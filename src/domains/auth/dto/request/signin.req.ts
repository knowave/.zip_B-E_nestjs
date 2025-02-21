import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SigninBody {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'test@test.com',
    description: '이메일',
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'password',
    description: '비밀번호',
  })
  password: string;
}
