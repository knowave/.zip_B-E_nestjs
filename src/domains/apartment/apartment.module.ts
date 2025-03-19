import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApartmentRepository } from './repositories/apartment.repository';
import { ApartmentService } from './apartment.service';
import { ApartmentController } from './apartment.controller';
import { ApartmentImage } from './entities/apartment-image.entity';
import { ApartmentImageRepository } from './repositories/apartment-image.repository';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [TypeOrmModule.forFeature([ApartmentRepository, ApartmentImage]), HttpModule, ScheduleModule.forRoot()],
    providers: [ApartmentService, ApartmentRepository, ApartmentImageRepository],
    controllers: [ApartmentController],
    exports: [ApartmentService],
})
export class ApartmentModule {}
