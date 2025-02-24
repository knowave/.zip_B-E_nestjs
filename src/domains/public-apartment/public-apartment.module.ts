import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicApartmentRepository } from './public-apartment.repository';
import { PublicApartmentService } from './public-apartment.service';
import { PublicApartmentController } from './public-apartment.controller';
import { PublicApartmentImage } from './entities/public-apartment-image.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PublicApartmentRepository, PublicApartmentImage])],
    providers: [PublicApartmentService, PublicApartmentRepository],
    controllers: [PublicApartmentController],
})
export class PublicApartmentModule {}
