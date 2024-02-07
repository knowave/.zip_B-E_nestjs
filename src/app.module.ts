import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MysqlModule } from './mysql/mysql.module';
import { ApartmentModule } from './apartment/apartment.module';
import { ApartmentService } from './apartment/apartment.service';
import { ApartmentController } from './apartment/apartment.controller';

@Module({
  imports: [UserModule, AuthModule, MysqlModule, ApartmentModule],
  controllers: [AppController, ApartmentController],
  providers: [AppService, ApartmentService],
})
export class AppModule {}
