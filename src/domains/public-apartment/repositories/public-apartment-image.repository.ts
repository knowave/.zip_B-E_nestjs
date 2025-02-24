import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PublicApartmentImage } from '../entities/public-apartment-image.entity';

@Injectable()
export class PublicApartmentImageRepository extends Repository<PublicApartmentImage> {
    constructor(private readonly dataSource: DataSource) {
        super(PublicApartmentImage, dataSource.createEntityManager());
    }

    async bulkSave(publicApartmentImageList: PublicApartmentImage[]) {
        return await this.bulkSave(publicApartmentImageList);
    }
}
