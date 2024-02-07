import { Module } from '@nestjs/common';
import { ApartmentController } from './apartment.controller';
import { ApartmentService } from './apartment.service';

@Module({
  imports: [],
  providers: [ApartmentService],
  controllers: [ApartmentController],
  exports: [],
})
export class ApartmentModule {}
