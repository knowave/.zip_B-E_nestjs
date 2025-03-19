import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Like } from './entities/like.entity';
import { FindManyApartmentOrCommentLikeByUserPaginationType } from './types/find-many-apartment-or-comment-like-by-user-pagination.type';
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

    findOneByUserIdAndApartmentId(userId: string, apartmentId: string) {
        return this.findOne({
            where: { user: { id: userId }, apartment: { id: apartmentId } },
        });
    }

    findManyApartmentOrCommentLikeByUserPagination({
        filter,
        userId,
        skip,
        take,
    }: FindManyApartmentOrCommentLikeByUserPaginationType) {
        const query = this.createQueryBuilder('like')
            .leftJoinAndSelect('like.user', 'user')
            .leftJoinAndSelect('like.comment', 'comment')
            .leftJoinAndSelect('like.apartment', 'apt')
            .where('user.id = :userId', { userId });

        switch (filter) {
            case LikeFilterEnum.COMMENT:
                query.andWhere('comment.id IS NOT NULL').andWhere('apt.id IS NULL');
                break;
            case LikeFilterEnum.APT:
                query.andWhere('apt.id IS NOT NULL').andWhere('comment.id IS NULL');
                break;
            case LikeFilterEnum.ALL:
                query.andWhere('comment.id IS NOT NULL').andWhere('apt.id IS NOT NULL');
                break;
        }

        return query.skip(skip).take(take).getManyAndCount();
    }
}
