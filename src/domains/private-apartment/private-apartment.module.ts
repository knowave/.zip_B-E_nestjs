import { Module } from '@nestjs/common';
import { PrivateApartmentService } from './private-apartment.service';
import { PrivateApartmentController } from './private-apartment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrivateApartment } from './entities/private-apartment.entity';
import { PrivateApartmentImage } from './entities/private-apartment-image.entity';
import { PrivateApartmentRepository } from './repositories/private-apartment.repository';
import { PrivateApartmentImageRepository } from './repositories/private-apartment-image.repository';

@Module({
    imports: [TypeOrmModule.forFeature([PrivateApartment, PrivateApartmentImage])],
    providers: [PrivateApartmentService, PrivateApartmentRepository, PrivateApartmentImageRepository],
    controllers: [PrivateApartmentController],
    exports: [PrivateApartmentService],
})
export class PrivateApartmentModule {}
