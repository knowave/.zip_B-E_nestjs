import { BaseEntity } from 'src/common/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PublicApartment } from './public-apartment.entity';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class PublicApartmentImage extends BaseEntity {
    @Expose()
    @ApiProperty()
    @Column({ type: 'varchar', length: 2083, nullable: false, comment: '공영 아파트 이미지 주소' })
    imageUrl: string;

    @ManyToOne(() => PublicApartment, (apartment) => apartment.images)
    publicApartment: PublicApartment;
}
