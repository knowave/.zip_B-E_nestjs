import { Expose, Type } from 'class-transformer';
import { Apartment } from '../../entities/apartment.entity';
import { ApartmentImage } from '../../entities/apartment-image.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetApartmentList extends Apartment {
    @Expose()
    @Type(() => ApartmentImage)
    @ApiProperty({ type: [ApartmentImage] })
    images: ApartmentImage[];
}

export class GetApartmentListResponse {
    @Expose()
    @Type(() => GetApartmentList)
    @ApiProperty({ type: [GetApartmentList] })
    apartmentList: GetApartmentList[];

    @Expose()
    @ApiProperty()
    currentPage: number;

    @Expose()
    @ApiProperty()
    totalPage: number;

    @Expose()
    @ApiProperty()
    totalCount: number;
}
