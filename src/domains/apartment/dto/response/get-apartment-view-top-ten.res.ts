import { Expose, Type } from 'class-transformer';
import { Apartment } from '../../entities/apartment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetApartmentViewTopThreeResponse {
    @Expose()
    @Type(() => Apartment)
    @ApiProperty({ type: [Apartment], isArray: true })
    apartmentList: Apartment[];
}
