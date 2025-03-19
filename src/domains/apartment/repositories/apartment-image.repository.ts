import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ApartmentImage } from '../entities/apartment-image.entity';

@Injectable()
export class ApartmentImageRepository extends Repository<ApartmentImage> {
    constructor(private readonly dataSource: DataSource) {
        super(ApartmentImage, dataSource.createEntityManager());
    }

    async bulkSave(apartmentImageList: ApartmentImage[]) {
        return await this.bulkSave(apartmentImageList);
    }
}
