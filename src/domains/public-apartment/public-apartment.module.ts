import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicApartmentRepository } from './repositories/public-apartment.repository';
import { PublicApartmentService } from './public-apartment.service';
import { PublicApartmentController } from './public-apartment.controller';
import { PublicApartmentImage } from './entities/public-apartment-image.entity';
import { PublicApartmentImageRepository } from './repositories/public-apartment-image.repository';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [TypeOrmModule.forFeature([PublicApartmentRepository, PublicApartmentImage]), HttpModule],
    providers: [PublicApartmentService, PublicApartmentRepository, PublicApartmentImageRepository],
    controllers: [PublicApartmentController],
    exports: [PublicApartmentService],
})
export class PublicApartmentModule {}
