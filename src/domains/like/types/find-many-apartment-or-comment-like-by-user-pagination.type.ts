import { LikeFilterEnum } from '../enums/like-filter.enum';

export type FindManyApartmentOrCommentLikeByUserPaginationType = {
    filter: LikeFilterEnum;
    userId: string;
    skip: number;
    take: number;
};
