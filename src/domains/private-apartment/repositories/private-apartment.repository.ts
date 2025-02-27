import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PrivateApartment } from '../entities/private-apartment.entity';
import { FindManyPaginationType } from '../types/find-many-pagination.type';

@Injectable()
export class PrivateApartmentRepository extends Repository<PrivateApartment> {
    constructor(private readonly dataSource: DataSource) {
        super(PrivateApartment, dataSource.createEntityManager());
    }

    findManyPagination({ skip, take, apartmentName, region, startDate, endDate }: FindManyPaginationType) {
        return this.createQueryBuilder('pa')
            .leftJoinAndSelect('pa.images', 'images')
            .where('pa.apartmentName LIKE :apartmentName', { apartmentName: `%${apartmentName}%` })
            .andWhere('pa.region LIKE :region', { region: `%${region}%` })
            .andWhere('pa.noticeDate BETWEEN :startDate AND :endDate', { startDate, endDate })
            .orderBy('pa.noticeDate', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }
}
