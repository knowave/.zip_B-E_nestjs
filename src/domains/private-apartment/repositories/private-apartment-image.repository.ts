import { Injectable } from '@nestjs/common';
import { PrivateApartmentImage } from '../entities/private-apartment-image.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PrivateApartmentImageRepository extends Repository<PrivateApartmentImage> {
    constructor(private readonly dataSource: DataSource) {
        super(PrivateApartmentImage, dataSource.createEntityManager());
    }
}
