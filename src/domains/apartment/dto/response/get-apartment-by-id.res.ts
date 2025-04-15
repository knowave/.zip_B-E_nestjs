import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Apartment } from '../../entities/apartment.entity';
import { Expose, Type } from 'class-transformer';

export class GetApartmentComment {
    @Expose()
    @ApiProperty()
    id: string;

    @Expose()
    @ApiProperty()
    content: string;

    @Expose()
    @ApiProperty()
    isPrivate: boolean;

    @Expose()
    @ApiProperty()
    likeCount: number;

    @Expose()
    @ApiProperty()
    username: string;

    @Expose()
    @ApiProperty()
    createdAt: Date;

    @Expose()
    @ApiProperty()
    updatedAt: Date;
}

export class GetApartmentByIdResponse extends OmitType(Apartment, ['comments']) {
    @Expose()
    @Type(() => GetApartmentComment)
    @ApiProperty({ type: [GetApartmentComment], isArray: true })
    comments: GetApartmentComment[];
}
