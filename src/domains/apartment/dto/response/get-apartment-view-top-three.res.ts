import { Expose, Type } from 'class-transformer';
import { Apartment } from '../../entities/apartment.entity';
import { ApiProperty, PickType } from '@nestjs/swagger';

class GetApartmentViewTopThree extends PickType(Apartment, [
    'id',
    'announcementName',
    'viewCount',
    'totalHouseholds',
    'businessDistrict',
]) {}

export class GetApartmentViewTopThreeResponse {
    @Expose()
    @Type(() => GetApartmentViewTopThree)
    @ApiProperty({ type: [GetApartmentViewTopThree], isArray: true })
    apartmentList: GetApartmentViewTopThree[];
}
