import { Controller } from '@nestjs/common';
import { PublicApartmentService } from './public-apartment.service';

@Controller('public-apartment')
export class PublicApartmentController {
    constructor(private readonly publicApartmentService: PublicApartmentService) {}
}
