import { ApartmentEnum } from '../enums/apartment.type.enum';

export type findManyApartmentCommentPaginationType = {
    skip: number;
    take: number;
    type: ApartmentEnum;
    publicApartmentId?: string;
    privateApartmentId?: string;
};
