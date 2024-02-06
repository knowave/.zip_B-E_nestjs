import { Module } from '@nestjs/common';
import { CoService } from './co/co.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [CoService, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
