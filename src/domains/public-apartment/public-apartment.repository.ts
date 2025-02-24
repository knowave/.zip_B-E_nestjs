import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PublicApartment } from './entities/public-apartment.entity';

@Injectable()
export class PublicApartmentRepository extends Repository<PublicApartment> {
    constructor(private readonly dataSource: DataSource) {
        super(PublicApartment, dataSource.createEntityManager());
    }
}
