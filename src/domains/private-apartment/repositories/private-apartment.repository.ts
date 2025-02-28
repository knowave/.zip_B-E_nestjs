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

    findOneById(id: string) {
        return this.findOne({ where: { id } });
    }

    incrementLikeCount(id: string) {
        return this.increment({ id }, 'likeCount', 1);
    }

    decrementLikeCount(id: string) {
        return this.decrement({ id }, 'likeCount', 1);
    }

    incrementCommentCount(id: string) {
        return this.increment({ id }, 'commentCount', 1);
    }

    decrementCommentCount(id: string) {
        return this.decrement({ id }, 'commentCount', 1);
    }

    incrementViewCount(id: string) {
        return this.increment({ id }, 'viewCount', 1);
    }

    decrementViewCount(id: string) {
        return this.decrement({ id }, 'viewCount', 1);
    }
}
