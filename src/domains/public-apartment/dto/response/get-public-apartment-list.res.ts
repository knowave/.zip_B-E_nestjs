import { Expose, Type } from 'class-transformer';
import { PublicApartment } from '../../entities/public-apartment.entity';
import { PublicApartmentImage } from '../../entities/public-apartment-image.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetPublicApartmentList extends PublicApartment {
    @Expose()
    @Type(() => PublicApartmentImage)
    @ApiProperty({ type: [PublicApartmentImage] })
    images: PublicApartmentImage[];
}

export class GetPublicApartmentListResponse {
    @Expose()
    @Type(() => GetPublicApartmentList)
    @ApiProperty({ type: [GetPublicApartmentList] })
    publicApartmentList: GetPublicApartmentList[];

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
