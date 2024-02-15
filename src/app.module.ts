import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MysqlModule } from './mysql/mysql.module';
import { ApartmentModule } from './apartment/apartment.module';
import { ApartmentService } from './apartment/apartment.service';
import { ApartmentController } from './apartment/apartment.controller';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './auth/guards/jwt-auth.guard';
import { LikeModule } from './like/like.module';
import { PrivateAptModule } from './private-apt/private-apt.module';
import { PrivateAptDetailModule } from './private-apt-detail/private-apt-detail.module';

@Module({
  imports: [UserModule, AuthModule, MysqlModule, ApartmentModule, LikeModule, PrivateAptModule, PrivateAptDetailModule],
  controllers: [AppController, ApartmentController],
  providers: [
    AppService,
    ApartmentService,
    { provide: APP_GUARD, useClass: JWTAuthGuard },
  ],
})
export class AppModule {}
