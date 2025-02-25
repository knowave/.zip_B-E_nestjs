import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { FindManyPublicApartmentOrCommentLikeByUserPaginationType } from './types/find-many-public-apartment-or-comment-like-by-user-pagination.type';
import { LikeFilterEnum } from './enums/like-filter.enum';

@Injectable()
export class LikeRepository extends Repository<Like> {
    constructor(private readonly dataSource: DataSource) {
        super(Like, dataSource.createEntityManager());
    }

    findOneByUserIdAndCommentId(userId: string, commentId: string) {
        return this.findOne({
            where: { user: { id: userId }, comment: { id: commentId } },
        });
    }

    findOneByUserIdAndPublicApartmentId(userId: string, publicApartmentId: string) {
        return this.findOne({
            where: { user: { id: userId }, publicApartment: { id: publicApartmentId } },
        });
    }

    findManyPublicApartmentOrCommentLikeByUserPagination({
        filter,
        userId,
        skip,
        take,
    }: FindManyPublicApartmentOrCommentLikeByUserPaginationType) {
        const query = this.createQueryBuilder('like')
            .leftJoinAndSelect('like.user', 'user')
            .leftJoinAndSelect('like.comment', 'comment')
            .leftJoinAndSelect('like.publicApartment', 'pa')
            .where('user.id = :userId', { userId });

        switch (filter) {
            case LikeFilterEnum.COMMENT:
                query.andWhere('comment.id IS NOT NULL').andWhere('pa.id IS NULL');
                break;
            case LikeFilterEnum.PUBLIC_APARTMENT:
                query.andWhere('pa.id IS NOT NULL').andWhere('comment.id IS NULL');
                break;
            case LikeFilterEnum.ALL:
                query.andWhere('comment.id IS NOT NULL').andWhere('pa.id IS NOT NULL');
                break;
        }

        return query.skip(skip).take(take).getManyAndCount();
    }
}
