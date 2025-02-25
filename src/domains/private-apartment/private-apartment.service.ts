import { Injectable } from '@nestjs/common';
import { PrivateApartmentRepository } from './repositories/private-apartment.repository';
import { PrivateApartmentImageRepository } from './repositories/private-apartment-image.repository';

@Injectable()
export class PrivateApartmentService {
    constructor(
        private readonly privateApartmentRepository: PrivateApartmentRepository,
        private readonly privateApartmentImageRepository: PrivateApartmentImageRepository,
    ) {}
}
