import { LikeFilterEnum } from '../enums/like-filter.enum';

export type FindManyPublicApartmentOrCommentLikeByUserPaginationType = {
    filter: LikeFilterEnum;
    userId: string;
    skip: number;
    take: number;
};
