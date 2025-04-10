import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CheckEmailRequest {
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
