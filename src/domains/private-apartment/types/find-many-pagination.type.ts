export type FindManyPaginationType = {
    skip: number;
    take: number;
    apartmentName?: string;
    region: string;
    startDate: Date;
    endDate: Date;
};
