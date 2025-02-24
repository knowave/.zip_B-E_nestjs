import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicApartmentRepository } from './public-apartment.repository';
import { PublicApartmentService } from './public-apartment.service';
import { PublicApartmentController } from './public-apartment.controller';

@Module({
    imports: [TypeOrmModule.forFeature([PublicApartmentRepository])],
    providers: [PublicApartmentService, PublicApartmentRepository],
    controllers: [PublicApartmentController],
})
export class PublicApartmentModule {}
