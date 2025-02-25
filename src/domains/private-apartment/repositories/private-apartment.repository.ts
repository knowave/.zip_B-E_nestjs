import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PrivateApartment } from '../entities/private-apartment.entity';

@Injectable()
export class PrivateApartmentRepository extends Repository<PrivateApartment> {
    constructor(private readonly dataSource: DataSource) {
        super(PrivateApartment, dataSource.createEntityManager());
    }
}
