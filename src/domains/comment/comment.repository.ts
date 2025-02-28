import { Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { findManyApartmentCommentPaginationType } from './types/find-many-apartment-comment-pagination.type';
import { ApartmentEnum } from './enums/apartment.type.enum';

@Injectable()
export class CommentRepository extends Repository<Comment> {
    constructor(private readonly dataSource: DataSource) {
        super(Comment, dataSource.createEntityManager());
    }

    findOneById(id: string) {
        return this.findOne({ where: { id } });
    }

    findManyApartmentCommentPagination({
        skip,
        take,
        type,
        publicApartmentId,
        privateApartmentId,
    }: findManyApartmentCommentPaginationType) {
        let qb: SelectQueryBuilder<Comment>;

        if (type === ApartmentEnum.PUBLIC_APT) {
            qb = this.createQueryBuilder('comment')
                .leftJoinAndSelect('comment.user', 'user')
                .leftJoin('comment.publicApartment', 'pa')
                .addSelect('pa.id ', 'paId')
                .where('paId = :publicApartmentId', { publicApartmentId });
        }

        if (type === ApartmentEnum.PRIVATE_APT) {
            qb = this.createQueryBuilder('comment')
                .leftJoinAndSelect('comment.user', 'user')
                .leftJoin('comment.privateApartment', 'pa')
                .addSelect('pa.id ', 'paId')
                .where('paId = :privateApartmentId', { privateApartmentId });
        }

        return qb.skip(skip).take(take).orderBy('comment.createdAt', 'DESC').getManyAndCount();
    }
}
