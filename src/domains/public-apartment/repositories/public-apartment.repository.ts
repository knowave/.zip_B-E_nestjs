import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PublicApartment } from '../entities/public-apartment.entity';
import { FindManyPaginationType } from '../types/find-many-pagination.type';

@Injectable()
export class PublicApartmentRepository extends Repository<PublicApartment> {
    constructor(private readonly dataSource: DataSource) {
        super(PublicApartment, dataSource.createEntityManager());
    }

    findManyPagination({ skip, take, supplyAreaName, startDate, endDate }: FindManyPaginationType) {
        const secondSpell = supplyAreaName.substring(1, 2);

        if (secondSpell === '상') supplyAreaName = '경상';
        if (secondSpell === '기') supplyAreaName = '경기';

        return this.createQueryBuilder('pa')
            .leftJoinAndSelect('pa.images', 'images')
            .where('pa.supplyAreaName LIKE :supplyAreaName', { supplyAreaName: `${supplyAreaName}%` })
            .andWhere('pa.postDate BETWEEN :startDate AND :endDate', { startDate, endDate })
            .orderBy('pa.postDate', 'DESC')
            .skip(skip)
            .take(take)
            .getManyAndCount();
    }

    findOneById(id: string) {
        return this.findOne({ where: { id } });
    }

    incrementLikeCount(id: string) {
        return this.increment({ id }, 'likeCount', 1);
    }

    decrementLikeCount(id: string) {
        return this.decrement({ id }, 'likeCount', 1);
    }
}
