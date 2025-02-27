import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PrivateApartment } from '../../entities/private-apartment.entity';

export class GetPrivateApartment extends PrivateApartment {}

export class GetPrivateApartmentListResponse {
    @Expose()
    @Type(() => PrivateApartment)
    @ApiProperty({ type: [PrivateApartment] })
    privateApartmentList: PrivateApartment[];

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
